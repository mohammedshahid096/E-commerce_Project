import React from "react";
import ReactStars from "react-rating-stars-component";
import Profile from "../../../Images/profile2.jpg";

const ReviewCard = (props) => {
  const { review } = props;
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <div className="reviewCard">
      <img src={Profile} alt="User" />
      <p>{review.name}</p>
      <ReactStars {...options} />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
