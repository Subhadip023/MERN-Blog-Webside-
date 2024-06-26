import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Avatar from "../img/Author-img/avatar-659652_640.png";
import upperCase1st from "../uppercase1st";
import ReactTimeAgo from 'react-time-ago';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import ru from 'javascript-time-ago/locale/ru.json';

TimeAgo.addLocale(en); 
TimeAgo.addLocale(ru);

const PostAuther = ({ authorID, updatedAt ,readTime}) => {
  const [author, setAuthor] = useState(null);
  // const [avatar, setAvatar] = useState(Avatar);

  useEffect(() => {
    const getAuthor = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/${authorID}`);
        setAuthor(response?.data);
        // console.log(response.data)  
      } catch (error) {
        console.log(error);
      }
    };

    getAuthor();
  }, [authorID]);

  return (
    <Link to={`/posts/users/${authorID}`} className="post_author">
      <div className="post_author-avatar">
        {author && author.avatar ? (
          <img src={author.avatar} alt="Author Avatar" />
        ) : (
          <img src={Avatar} alt="Default Avatar" />
        )}

        {/* <img src={avatar||author.avatar} alt="Author Avatar" /> */}
      </div>
      <div className="post_author-details">
        {author && (
          <>
            <h5>By: {upperCase1st(author.name)}</h5>
            
            <small><ReactTimeAgo date={new Date(updatedAt)} locale="en" /></small> {readTime ?   <small className="post_readTime"> {readTime} min read</small>:" "}
          </>
        )}
      </div>
    </Link>
  );
};

export default PostAuther;
