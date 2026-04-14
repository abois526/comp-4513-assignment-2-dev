import { useNavigate } from "react-router";
import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

const GenreCard = (props: any) => {
  const navigate = useNavigate();

  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0 flex flex-col overflow-hidden">
      <img
        src={props.imgSrc}
        alt={props.name}
        className="w-full aspect-4/3 object-cover object-top"
      />
      <CardHeader className="flex-1">
        <CardTitle>{props.name}</CardTitle>
      </CardHeader>
      <CardFooter>
        <Button className="w-full cursor-pointer" onClick={() => navigate(`/browse?genre=${props.genreId}`)}>View Genre</Button>
      </CardFooter>
    </Card>
  );
};

export default GenreCard;