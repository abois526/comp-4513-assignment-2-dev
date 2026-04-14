import { useNavigate } from "react-router";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

const ArtistCard = (props: any) => {
  const navigate = useNavigate();

  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0 flex flex-col overflow-hidden">
      <img
        src={props.imageSrc}
        alt={props.name}
        className="w-full aspect-4/3 object-cover object-top"
      />
      <CardHeader className="flex-1">
        <CardTitle>{props.name}</CardTitle>
        <CardDescription className="line-clamp-3">
          {props.description !== "N/A" ? props.description : "No description available."}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full cursor-pointer" onClick={() => navigate(`/browse?artist=${props.artistId}`)}>View Artist</Button>
      </CardFooter>
    </Card>
  );
};

export default ArtistCard;