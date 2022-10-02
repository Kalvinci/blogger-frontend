import default_img from "../../../../defaultProfileImage.jpg";
import styles from "./CommentListItem.module.css";

function BlogListItem(props) {
	const profileImage = props.profilePicUrl ? props.profilePicUrl : default_img;
	return (
		<div className={styles.container}>
			<div className={styles.profile}>
				<img style={{ borderRadius: "50%", width: "50px" }} src={profileImage} alt="Profile" />
			</div>
			<div className={styles.content}>
				<h6>{props.username}</h6>
				<div style={{ fontSize: "12px", margin: "0 0 10px 0" }}>{props.dateTime}</div>
				<div>{props.content}</div>
			</div>
		</div>
	);
}

export default BlogListItem;