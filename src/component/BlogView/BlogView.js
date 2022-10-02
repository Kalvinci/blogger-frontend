import Stack from 'react-bootstrap/Stack';
import default_img from "../../defaultProfileImage.jpg";
import blogStyles from "./BlogView.module.css";
import "./CKEditor.css";

function BlogView(props) {
    const profileImage = props.profilePicUrl ? props.profilePicUrl : default_img;
    return (
        <Stack gap={2}>
            <h1>{props.title}</h1>
            <div style={{ fontSize: "large" }}>{props.subTitle}</div>
            <div className={blogStyles.container} style={{ margin: "15px 0" }}>
                <div style={{ width: "20%", padding: "0 5px" }}>
                    <div className={blogStyles.profileContainer}>
                        <img style={{ borderRadius: "50%", width: "96px" }} src={profileImage} alt="Profile" />
                        <h5 style={{ margin: "5px 0", textAlign: "center" }}>{props.username}</h5>
                        <div style={{ margin: "5px 0", textAlign: "center" }}>{props.date}</div>
                        <div style={{ marginBottom: "5px", textAlign: "center" }}>{props.time}</div>
                        <div style={{ margin: "5px 0", paddingTop: "5px", borderTop: "1px solid" }}>In this article: <span style={{ color: "grey" }}>{props.keywords}</span></div>
                    </div>
                </div>
                <div style={{ width: "60%" }}>
                    <div className="ck-content" dangerouslySetInnerHTML={{ __html: props.content }}></div>
                </div>
            </div>
        </Stack>
    );
}

export default BlogView;