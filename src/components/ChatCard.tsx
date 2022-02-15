import { Button, Card } from "react-bootstrap";
import { useGetUserByIdQuery } from "../generated/graphql";

interface ChatCardProps {
  userId: string; // string
  chatId: string;
}

export const ChatCard: React.FC<ChatCardProps> = ({ userId, chatId }) => {
  const [{ data, fetching }] = useGetUserByIdQuery({
    variables: {
      userId: userId.toString(), // why number
    },
  });

  //console.log(typeof userId); // wtf why number ???

  return (
    <Card className="mb-2">
      <Card.Body className="d-flex justify-content-between">
        <div>
          <Card.Title>chat with {data?.getUserById?.username}</Card.Title>
          <Card.Text>last message: </Card.Text>
        </div>
        <Button
          disabled={fetching}
          onClick={() => {
            console.log(chatId);
          }}
        >
          Go to chat
        </Button>
      </Card.Body>
    </Card>
  );
};
