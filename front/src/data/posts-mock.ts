import { Post } from '../app/interfaces/Post.interface';

export const POSTS: Post[] = [
  {
    id: 1,
    createdAt: '2024-07-19',
    title: 'The Future of Artificial Intelligence',
    author_id: 1,
    author_name: 'John Doe',
    content:
      'Artificial intelligence (AI) is rapidly evolving, with advancements in machine learning, natural language processing, and robotics. Experts predict that AI will transform various industries, including healthcare, finance, and transportation, by providing more efficient and personalized services. However, ethical considerations and the potential impact on employment remain critical issues that need to be addressed. As AI continues to develop, it is essential to balance innovation with responsibility to ensure a beneficial outcome for society.',
    topic_id: 1,
    topic_name: 'Artificial Intelligence',
  },
  {
    id: 2,
    createdAt: '2024-07-20',
    title: 'Renewable Energy Sources and Their Impact',
    author_id: 1,
    author_name: 'John Doe',
    content:
      'Artificial intelligence (AI) is rapidly evolving, with advancements in machine learning, natural language processing, and robotics. Experts predict that AI will transform various industries, including healthcare, finance, and transportation, by providing more efficient and personalized services. However, ethical considerations and the potential impact on employment remain critical issues that need to be addressed. As AI continues to develop, it is essential to balance innovation with responsibility to ensure a beneficial outcome for society.',
    topic_id: 1,
    topic_name: 'Renewable Energy',
  },
];
