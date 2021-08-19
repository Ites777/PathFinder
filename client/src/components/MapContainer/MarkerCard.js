import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import "react-multi-carousel/lib/styles.css";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { server } from "../../constants";
import { Rating } from "@material-ui/lab";
import { Badge } from "react-bootstrap";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function CardRoutes({cardProps}) {
  const classes = useStyles();
  let variant, text;

  if (cardProps.difficulty < 4) {
    variant = "green";
    text = "eazy";
  } else if (cardProps.difficulty < 7) {
    variant = "lightblue";
    text = "средний";
  } else {
    variant = "red";
    text = "тяжелый";
  }

  return (
    <div className="cardOne" key={cardProps.id}>
      <Card className={classes.root}>
        <Link to={`/card/${cardProps.id}`} style={{ textDecoration: "none" }}>
          <CardActionArea>
            <div
              style={{
                background: "rgb(2,0,36)",
                display: "flex",
                backgroundImage: `linear-gradient(0deg, rgba(2,0,36,1) 2%, rgba(22,13,13,0) 35%), url(${server}${cardProps.url})`,
                backgroundSize: "cover",
                height: `35vh`,
                borderRadius: "5px",
              }}
            >
              <div>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  style={{
                    color: "white",
                    marginTop: "30vh",
                    marginLeft: "1vw",
                  }}
                >
                  {cardProps.title}
                </Typography>
              </div>
            </div>
            <CardContent>
              <div
                style={{
                  
                  display: "flex",
                  justifyContent: "space-between",
                  maxWidth: "95%",
                  padding: '10px',
                }}
              >
                <Rating
                  name="half-rating-read"
                  defaultValue={cardProps.rating}
                  precision={0.5}
                  readOnly
                />
                <Badge
                  style={{ backgroundColor: `${variant}`, marginLeft: "20px" }}
                >
                  {text}
                </Badge>
              </div>
            </CardContent>
          </CardActionArea>
        </Link>
      </Card>
    </div>
  );
}

