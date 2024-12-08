import React, { useState, useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

import { AuthContext } from '../contexts/AuthProvider';

const BookCard = ({ headline, books }) => {
  const [hoveredBook, setHoveredBook] = useState(null);
  const { user } = useContext(AuthContext);

  return (
    <div className='my-16 px-4 lg:px-24'>
      <h2 className='text-5xl text-center font-bold text-gray-800 pb-10'>{headline}</h2>
      <div>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {books.map((book, index) => (
            <SwiperSlide key={index}>
              <div>
                <img src={book.imageURL} alt="" className="w-full h-auto" />
                <h3 className='text-xl font-semibold text-gray-800 mb-2'>{book.bookTitle.length > 50 ? book.bookTitle.substring(0, 50) + '...' : book.bookTitle}</h3>
                <p className='text-sm text-gray-600 mb-1'>Author: {book.authorName}</p>
                <p className='text-sm text-gray-600 mb-2'>Category: {book.category}</p>
                <p className='text-lg font-bold mb-4'>Price: {book.Price} TK</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BookCard;
