interface Review {
  id: string;
  name: string;
  date: string;
  rating: number;
  title: string;
  content: string;
}

export const Reviews: Review[] = [
  {
    id: "1",
    name: "Mohammed Salah",
    date: "May 25, 2024",
    rating: 5,
    title: "Good for shifting sales approach/mindset",
    content:
      "If I could give this book 10 stars, I would! This book beats many other books. This book is so exciting to read that I read it three times! The beginning of the book said it extremely well – This book is about a unique kind of leadership that has the natural recurring pattern of inspiring, influencing, and affecting people.",
  },
  {
    id: "2",
    name: "John Doe",
    date: "March 15, 2024",
    rating: 4,
    title: "Insightful read",
    content:
      "This book provides a lot of valuable insights. It’s not just about theories but also practical advice. Definitely worth reading if you are interested in leadership and personal growth.",
  },
  {
    id: "3",
    name: "Jane Smith",
    date: "January 10, 2024",
    rating: 5,
    title: "Life-changing perspectives",
    content:
      "This book opened my eyes to a new way of thinking. I feel more motivated to make a difference in my field. The author has done a fantastic job of presenting ideas clearly and concisely.",
  },
  {
    id: "4",
    name: "Emma Brown",
    date: "December 5, 2023",
    rating: 3,
    title: "Good but repetitive",
    content:
      "While the book has some great ideas, I found some parts repetitive. It’s a good read, but I think it could have been shorter without losing impact.",
  },
];