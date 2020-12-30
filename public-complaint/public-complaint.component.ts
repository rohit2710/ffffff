import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PublicComplaint } from 'src/app/shared/models/public-complaint';
import {
  CitizenPP,
  PostFeedback,
  ComplaintPP,
  PostComment,
  PostCounts,
  CommentMessage,
} from 'src/app/shared/models/publicPost';
import { ComplaintService } from 'src/app/shared/services/complaint.service';

@Component({
  selector: 'app-public-complaint',
  templateUrl: './public-complaint.component.html',
  styleUrls: ['./public-complaint.component.scss'],
})
export class PublicComplaintComponent implements OnInit ,OnDestroy{
  //count
  totalLikes: number = 0;
  totalDisLikes: number = 0;
  totalComments: number = 0;
  subscriptionArray:Subscription[]=[];

  //ids
  userId: any;
  //@ts-ignore
  userName: string = sessionStorage.getItem('name');
  feedbackPostId?: any;
  complaintId?: any;
  imageBaseUrl: string = 'http://localhost:8080/api/download/';

  //CommentsArray
  commentsArray: PostComment[] = [];
  complaint = new PublicComplaint();

  constructor(
    private complaintService: ComplaintService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //get the data from path URl
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.complaintId = this.route.snapshot.paramMap.get('complaintId');
    this.getComplaintById();
  }

  //this function will load one complaint where he can like dislike and comment on that complaint 
  getComplaintById() {
    //@ts-ignore
    let subs=this.complaintService
      .getComplaintsById(this.complaintId)
      .subscribe((res: PublicComplaint) => {
        this.complaint = res;
        this.complaint.citizenName = res.citizenName;
        this.complaint.documentPath = this.imageBaseUrl + res.documentPath;
        this.feedbackPostId = this.complaint.feedbackPostId;
        
        let subs= this.complaintService
        //@ts-ignore
          .getComplaintDetal(this.complaint.feedbackPostId)
          //@ts-ignore
          .subscribe((postFeedback: PostFeedback) => {
            this.commentsArray = postFeedback.postComments.slice();
            this.commentsArray = this.commentsArray.map(
              (comment: PostComment) => {
                comment.elaspedTime = this.claculateTimeDifference(
                  comment.commentTime
                );
                return comment;
              }
            );
            this.totalDisLikes = postFeedback.dislikes.length;
            this.totalLikes = postFeedback.likes.length;
           this.totalComments=postFeedback.postComments.length;
            
          });
          this.subscriptionArray.push(subs);
      });
      this.subscriptionArray.push(subs);
  }
  //on the click of like button this method will be called
  like() {
    let subs=this.complaintService
      .likePost(this.feedbackPostId, this.userId)
      //@ts-ignore
      .subscribe((postCount: PostCounts) => {
        this.totalLikes = postCount.totalLikes;
        this.totalDisLikes = postCount.totalDislike;
      });
      this.subscriptionArray.push(subs);
  }
  //on click of islike button this function will be called
  dislike() {
    let subs=this.complaintService
      .disLikePost(this.feedbackPostId, this.userId)
      //@ts-ignore
      .subscribe((postCount: PostCounts) => {
        this.totalLikes = postCount.totalLikes;
        this.totalDisLikes = postCount.totalDislike;
      });
      this.subscriptionArray.push(subs);
  }
  addComment(message: HTMLTextAreaElement) {
    let commentMessage = new CommentMessage();
    commentMessage.message = message.value;
    commentMessage.userId = this.userId;
    commentMessage.userName = this.userName;
    message.value= "";
    let subs=this.complaintService
      .addComment(this.feedbackPostId, commentMessage)
      .subscribe(() => {
        //@ts-ignore
        this.commentsArray.push({ message: commentMessage.message, userId: commentMessage.userId, userName: commentMessage.userName,
          elaspedTime: 'now',
        });
      });
      this.subscriptionArray.push(subs);
  }
  loadMoreComments() {
  }

  claculateTimeDifference(time: any): string {
    let commentdate = new Date(time);
    let latestTime = new Date();
    let t = 0;
    if ((t = commentdate.getMonth() - latestTime.getMonth()) > 0) {
      return ' ' + t + ' Month Ago';
    } else if ((t = commentdate.getDate() - latestTime.getDate()) > 0) {
      return ' ' + t + ' Day Ago';
    } else if ((t = commentdate.getHours() - latestTime.getHours()) > 0) {
      return ' ' + t + ' Hour Ago';
    } else if ((t = commentdate.getMinutes() - latestTime.getMinutes()) > 0) {
      return ' ' + t + ' Minute Ago';
    } else if ((t = commentdate.getSeconds() - latestTime.getSeconds()) > 0) {
      return ' ' + t + ' Second Ago';
    }
    return ' now';
  }
  ngOnDestroy(): void {
    this.subscriptionArray.forEach(d => {
      d.unsubscribe();
    })
  }
}
