// FavoritesPage.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFavorite } from "../actions/actions";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favoritesState.favorites);

  const handleRemoveFavorite = (companyName) => {
    dispatch(removeFavorite(companyName));
  };

  return (
    <Container>
      <Row>
        <Col className="my-3">
          <h1 className="display-4">Your Favorites</h1>
          <ListGroup>
            {favorites.map((companyName) => (
              <ListGroup.Item key={companyName}>
                {companyName}
                <Button variant="danger" onClick={() => handleRemoveFavorite(companyName)}>
                  Remove
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default FavoritesPage;
