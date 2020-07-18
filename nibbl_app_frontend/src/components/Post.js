import React from 'react'

export default function Post(props) {
  const { content, time_created_string, user: { display_name, username } } = props.post
  return (
    <div className="social-card container my-2 p-3 px-4 border">
      <div className="clearfix social-card-header h-25">
        <div className="float-left mx-2">
          <h5>
            {display_name}
            <small>{` @${username}`}</small>
            <br />
            <small>{time_created_string}</small>
          </h5>
        </div>
      </div>
      <div className="social-card-body p-2 rounded">
        <p>{content}</p>
      </div>
    </div>
  )
}
