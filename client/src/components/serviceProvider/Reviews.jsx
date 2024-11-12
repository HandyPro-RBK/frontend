const Reviews = ({ reviews }) => {
    return (
      <div className="space-y-6">
        {reviews?.map((review) => (
          <div key={review.id} className="border-b pb-6">
            <div className="flex items-center gap-4 mb-3">
              <img
                src={review.user.photoUrl || '/default-avatar.png'}
                alt={review.user.username}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="font-medium">{review.user.username}</div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="text-gray-500 text-sm ml-auto">
                {new Date(review.createdAt).toLocaleDateString()}
              </div>
            </div>
            <p className="text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>
    );
  };