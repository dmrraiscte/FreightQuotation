import {
  Table,
  Container,
  Alert,
} from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

export const UserInfo = () => {
  const { userData, loading, error } =
    useAuth();

  if (error) {
    return (
      <Container className="mt-3">
        <Alert variant="danger">
          Error loading user data:{" "}
          {error}
        </Alert>
      </Container>
    );
  }

  if (loading || !userData) {
    return (
      <Container className="mt-3">
        <div>
          Loading user information...
        </div>
      </Container>
    );
  }

  return (
    <Container className="mt-3">
      <h2>User Information</h2>
      <Table
        responsive
        striped
        bordered
        hover
      >
        <tbody>
          {Object.entries(userData).map(
            ([key, value]) => (
              <tr key={key}>
                <td className="fw-bold">
                  {key}
                </td>
                <td>{String(value)}</td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </Container>
  );
};
