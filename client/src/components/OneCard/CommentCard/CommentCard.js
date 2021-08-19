import { Card } from "react-bootstrap";
import UserMiniCard from "../../UserMiniCard/UserMiniCard";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from "@material-ui/lab";
import { axiosAllComment, axiosComment } from "../../../store/commentsSlice";
import { useParams } from "react-router-dom";

export default function CommentCard() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const comment = useSelector((state) => state.comments.comments);

  useEffect(() => {
    dispatch(axiosAllComment(id));
  }, [comment.length]);

  return (
    <>
    {comment.length ?
      comment.map((el, i) => {
        // console.log(el.user_id);
        return (
            <div key={i}>         
              <hr />
              <UserMiniCard userId={el.user_id} />
              <Rating
                  name="half-rating-read"
                  defaultValue={el.rating}
                  precision={0.5}
                  readOnly
                />
              <Card.Text>{el.text}</Card.Text>
              </div>
          );
        }) :
        <div></div>
        }
        </>
  );
}
