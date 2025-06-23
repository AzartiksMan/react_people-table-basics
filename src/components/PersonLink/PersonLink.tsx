import cn from 'classnames';
import React from 'react';
import { Person } from '../../types';
import { Link } from 'react-router-dom';

interface Props {
  person: Person;
  isActive: boolean;
}

export const PersonLink: React.FC<Props> = ({ person, isActive }) => {
  const isPersonFemale = person.sex === 'f';

  return (
    <tr data-cy="person" className={cn({ 'has-background-warning': isActive })}>
      <td>
        <Link
          className={cn({
            'has-text-danger': isPersonFemale,
          })}
          to={`/people/${person.slug}`}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.mother ? (
          <Link
            to={`/people/${person.mother.slug}`}
            className="has-text-danger"
          >
            {person.mother.name}
          </Link>
        ) : (
          person.motherName || '-'
        )}
      </td>
      <td>
        {person.father ? (
          <Link to={`/people/${person.father.slug}`}>{person.father.name}</Link>
        ) : (
          person.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
