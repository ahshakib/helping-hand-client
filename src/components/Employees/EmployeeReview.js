import { FaStar, FaUserCircle } from 'react-icons/fa';

const EmployeeReview = () => {
  // Mock data for demonstration - in real app, this would come from props/API
  const reviews = [
    {
      id: 1,
      name: "John Doe",
      rating: 5,
      date: "2 weeks ago",
      comment: "Excellent service! Very professional and completed the work on time. Highly recommended for anyone looking for quality work.",
      verified: true
    },
    {
      id: 2,
      name: "Sarah Johnson",
      rating: 4,
      date: "1 month ago",
      comment: "Good experience overall. The professional was skilled and courteous. Would hire again.",
      verified: true
    },
    {
      id: 3,
      name: "Mike Wilson",
      rating: 5,
      date: "2 months ago",
      comment: "Outstanding work! Exceeded my expectations. Very satisfied with the service quality.",
      verified: false
    }
  ];

  const ratingDistribution = [
    { stars: 5, count: 89, percentage: 74 },
    { stars: 4, count: 21, percentage: 18 },
    { stars: 3, count: 6, percentage: 5 },
    { stars: 2, count: 3, percentage: 2 },
    { stars: 1, count: 1, percentage: 1 }
  ];

  const averageRating = 4.9;
  const totalReviews = 120;

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={index < rating ? 'text-amber-400' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Rating Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 sticky top-24">
            <h3 className="text-xl font-bold font-heading text-gray-800 mb-6">Rating Summary</h3>
            
            {/* Average Rating */}
            <div className="text-center mb-6 p-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl">
              <div className="text-5xl font-bold text-gray-800 mb-2">{averageRating}</div>
              <div className="flex justify-center gap-1 mb-2">
                {renderStars(5)}
              </div>
              <p className="text-gray-600 text-sm">Based on {totalReviews} reviews</p>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-3">
              {ratingDistribution.map((item) => (
                <div key={item.stars} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-12">
                    <span className="text-sm font-medium text-gray-700">{item.stars}</span>
                    <FaStar className="text-amber-400 text-xs" />
                  </div>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-300"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xl font-bold font-heading text-gray-800 mb-4">Customer Reviews</h3>
          
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              {/* Review Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <FaUserCircle className="text-gray-400 text-4xl" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-800">{review.name}</h4>
                      {review.verified && (
                        <span className="bg-primary-100 text-primary-700 text-xs px-2 py-0.5 rounded-full font-medium">
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{review.date}</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {renderStars(review.rating)}
                </div>
              </div>

              {/* Review Content */}
              <p className="text-gray-700 leading-relaxed">{review.comment}</p>
            </div>
          ))}

          {/* Load More Button */}
          <div className="text-center pt-6">
            <button className="bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg">
              Load More Reviews
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeReview
