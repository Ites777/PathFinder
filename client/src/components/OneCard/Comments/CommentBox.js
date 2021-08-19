import React, { useState, useRef, useEffect, useMemo } from "react";
import cn from "classnames";
import useDynamicHeightField from "./use";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import {Rating} from '@material-ui/lab'
import { axiosAllComment, axiosComment } from "../../../store/commentsSlice";
import { useParams } from 'react-router-dom'

const INITIAL_HEIGHT = 46;

/*
 * Read the blog post here:
 * https://letsbuildui.dev/articles/how-to-build-an-expandable-comment-box
 */
 function CommentBox() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [value, setValue] = useState(5);
  const user = {
    firstName: localStorage.firstName,
    lastName: localStorage.lastName,
  }
  const outerHeight = useRef(INITIAL_HEIGHT);
  const textRef = useRef(null);
  const containerRef = useRef(null);
  const dispatch = useDispatch()
  useDynamicHeightField(textRef, commentValue);
  const {id} = useParams()

  const comment = useSelector(state => state.comments.comments)

  useEffect(() => {
    dispatch(axiosAllComment(id))
  }, [])

  // console.log(comment);

  const onExpand = () => {
    if (!isExpanded) {
      outerHeight.current = containerRef.current.scrollHeight;
      setIsExpanded(true);
    }
  };

  const onChange = (e) => {
    setCommentValue(e.target.value);
  };

  const onClose = () => {
    setIsExpanded(false);
    setCommentValue("");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(axiosComment({data:commentValue, id, userId: localStorage.id, rating: value}))
    setCommentValue("");
    setIsExpanded(false);
  };

  return (
    <div  className="container">
      <form
        
        onSubmit={onSubmit}
        ref={containerRef}
        className={cn("comment-box", {
          expanded: isExpanded,
          collapsed: !isExpanded,
          modified: commentValue.length > 0
        })}
        style={{
          minHeight: isExpanded ? outerHeight.current : INITIAL_HEIGHT
        }}
      >
        <div className="header">
          <div className="user">
            <img
              src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/df/df7789f313571604c0e4fb82154f7ee93d9989c6.jpg"
              alt="User avatar"
            />
            <span>{user.firstName} {user.lastName}</span>
          </div>
        </div>
        <label htmlFor="comment">Оставьте рецензию на маршрут</label>
        <textarea
          style={{border: 'none'}}
          ref={textRef}
          onClick={onExpand}
          onFocus={onExpand}
          onChange={onChange}
          className="comment-field"
          placeholder="Оставьте рецензию на маршрут"
          value={commentValue}
          name="comment"
          id="comment"
        />
        
        <div className="actions">
          <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
        
          <button type="button" className="cancel" onClick={onClose}>
            Отмена
          </button>
          <button type="submit" style={{
            backgroundColor: 'green',
            color: 'white',
        }} disabled={commentValue.length < 1}>
            Отправить
          </button>
        </div>
      </form>
    </div>
  );
}

export default React.memo(CommentBox)
