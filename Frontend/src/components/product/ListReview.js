import React from 'react'

const ListReview = ({ reviews }) => {
    return (
        <div className="reviews w-75">
            <h3>Other's Reviews:</h3>
            <hr className='my-3' style={{border:'1px solid black'}} />
            {reviews && reviews.map(review => (
                
                <div key={review._id} className="review-card my-3">
                    <div className="rating-outer">
                        <div className="rating-inner" style={{width:`${(review.rating/5)*100}%`}}></div>
                    </div>
                    <p className="review_user">{review.name}</p>
                    <p className="review_comment">{review.comment}</p>

                    <hr className='my-3' style={{border:'1px solid black'}} />
                    {/* <hr /> */}
                </div>
            ))}
        </div>
    )
}

export default ListReview