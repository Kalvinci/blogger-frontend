import default_img from "../../../defaultProfileImage.jpg";
import styles from "./BlogListItem.module.css";

function BlogListItem(props) {
	const profileImage = props.profilePicUrl ? props.profilePicUrl : default_img;
	return (
		<div className={styles.container}>
			<div className={styles.profile}>
				<img style={{ borderRadius: "50%", width: "75px" }} src={profileImage} alt="Profile" />
				<h5 style={{ margin: "2px 0", textAlign: "center" }}>{props.username}</h5>
				<div style={{ fontSize: "12px", margin: "2px 0", textAlign: "center" }}>{props.date}</div>
				<div style={{ fontSize: "12px", textAlign: "center" }}>{props.time}</div>
			</div>
			<div className={styles.description}>
				<h3>{props.title}</h3>
				<div>{props.subTitle}</div>
				<div style={{ marginTop: "5px" }}>In this article: <span style={{ color: "grey" }}>{props.keywords}</span></div>
			</div>
		</div>
	);
}

export default BlogListItem;