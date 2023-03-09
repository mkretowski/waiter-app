// import PageTitle from '../../views/PageTitle/PageTitle';
// import { useSelector, useDispatch } from 'react-redux';
// import { getPostById } from '../../../redux/postsRedux';
// import { useParams } from 'react-router';
// import { Navigate, Link } from 'react-router-dom';
// import { Row, Col, Button, Modal } from 'react-bootstrap';
// import { removePost } from '../../../redux/postsRedux';
// import { useState } from 'react';
// import { dateToStr } from '../../../utils/dateToStr';

// const SinglePost = () => {
//   const dispatch = useDispatch();
//   const [showModal, setShowModal] = useState(false);
//   const { id } = useParams();
//   const postId = id;
//   const handleCloseModal = () => setShowModal(false);
//   const postData = useSelector((state) => getPostById(state, postId));
//   const handleShowModal = (e) => {
//     e.preventDefault();
//     setShowModal(true);
//   };
//   const handleRemovePost = (e) => {
//     e.preventDefault();
//     dispatch(removePost(postId));
//   };

//   if (!postData) return <Navigate to='/' />;
//   return (
//     <>
//       <Row className='m-0 p-2'>
//         <Col className='col-md-3 col-12 offset-md-2 text-md-start text-center p-0'>
//           <PageTitle>{postData.title}</PageTitle>
//           <p className='mb-0'>
//             <strong>Author: </strong>
//             {postData.author}
//           </p>
//           <p className='mb-0'>
//             <strong>Published: </strong>
//             {dateToStr(postData.publishedDate)}
//           </p>
//           <p>
//             <strong>Category: </strong>
//             {postData.category}
//           </p>
//           <p dangerouslySetInnerHTML={{ __html: postData.content }} />
//         </Col>
//         <Col className='col-md-3 col-12 offset-md-2 text-md-end text-center p-2'>
//           <Button variant='primary' as={Link} to={'/post/edit/' + postId}>
//             Edit
//           </Button>{' '}
//           <Button variant='outline-danger' onClick={handleShowModal}>
//             Delete
//           </Button>
//         </Col>
//       </Row>
//       <Modal show={showModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Are you sure?</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           This operation will completely remove this post from the app. Are you sure you want to do that?
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant='secondary' onClick={handleCloseModal}>
//             Cancel
//           </Button>
//           <Button variant='primary' onClick={handleRemovePost}>
//             Remove
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// export default SinglePost;
