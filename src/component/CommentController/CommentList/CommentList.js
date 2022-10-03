import Stack from 'react-bootstrap/Stack';
import CommentListItem from "./CommentListItem/CommentListItem";

function BlogList(props) {
	const commentList = []
	for (const commentData of props.comments) {
		commentList.push(<CommentListItem key={commentData.id} {...commentData} />)
	}
	return (
		<Stack gap={2}>
			{commentList}
		</Stack>
	);
}

export default BlogList;