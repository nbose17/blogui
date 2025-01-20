import { Button, Card, Input } from "antd";
import { useEffect, useState } from "react";
import { blogList, blogView } from "../../services/blog";
import moment from "moment";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";

const { Meta } = Card;

const View = () => {
  const [details, setDetails] = useState([]);
  const params = useParams();

  useEffect(() => {
    blogView(params.id).then((response) => {
      setDetails(response.data?.data);
    });
  }, []);

  return (
    <div className="container" style={{ minHeight: "100vh" }}>
      <div className="row" style={{ padding: "30px" }}>
        <Card title={details.title}>
          {/* <h2 className="mb-5">Title {}</h2> */}
          <p dangerouslySetInnerHTML={{ __html: details.message }} />
          <Button onClick={() => (window.location.href = "/blog/list")}>
            Back
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default View;
