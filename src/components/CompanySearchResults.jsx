import { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Job from "./Job";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchJobsBegin, fetchJobsSuccess, fetchJobsFailure } from "../actions/actions";

const CompanySearchResults = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { jobs, loading, error } = useSelector((state) => state.jobsState); // Assumi che il tuo reducer si chiami jobsState

  const baseEndpoint = "https://strive-benchmark.herokuapp.com/api/jobs?company=";

  useEffect(() => {
    dispatch(fetchJobsBegin());
    fetchJobs(params.company);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.company]);

  const fetchJobs = async (company) => {
    try {
      const response = await fetch(baseEndpoint + company);
      if (response.ok) {
        const data = await response.json();
        dispatch(fetchJobsSuccess(data));
      } else {
        throw new Error("Error fetching results");
      }
    } catch (error) {
      dispatch(fetchJobsFailure(error.message));
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container>
      <Row>
        <Col className="my-3">
          <h1 className="display-4">Job postings for: {params.company}</h1>
          <Button variant="primary" onClick={() => handleAddToFavorites(params.company)}>
            Add to Favorites
          </Button>
          {jobs.map((jobData) => (
            <Job key={jobData._id} data={jobData} />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default CompanySearchResults;
