import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { PersonLink } from '../components/PersonLink';
import { useParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [peopleData, setPeopleData] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { slug } = useParams();

  useEffect(() => {
    setHasError(false);
    setIsLoading(true);

    getPeople()
      .then(setPeopleData)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const peopleList = peopleData.map(person => {
    const father =
      peopleData.find(male => male.name === person.fatherName) || null;
    const mother =
      peopleData.find(fem => fem.name === person.motherName) || null;

    return {
      ...person,
      father: father,
      mother: mother,
    };
  });

  const tableTitles = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

  const isError = hasError && !isLoading;
  const isEmpty = !peopleList?.length && !isLoading && !hasError;
  const isPeople = !!peopleList?.length;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isEmpty && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {isPeople && (
            <table
              data-cy="peopleTable"
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  {tableTitles.map(title => (
                    <th key={title}>{title}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {peopleList.map(person => {
                  const isActive = person.slug === slug;

                  return (
                    <PersonLink
                      key={person.slug}
                      person={person}
                      isActive={isActive}
                    />
                  );
                })}
                ;
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
