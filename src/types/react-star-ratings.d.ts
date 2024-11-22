declare module 'react-star-ratings' {
    import { FC } from 'react';
  
    interface StarRatingsProps {
      rating: number;
      starRatedColor?: string;
      numberOfStars?: number;
      starDimension?: string;
      starSpacing?: string;
      starHoverColor?: string;
      changeRating?: (newRating: number) => void;
      name?: string;
    }
  
    const StarRatings: FC<StarRatingsProps>;
    export default StarRatings;
  }
  