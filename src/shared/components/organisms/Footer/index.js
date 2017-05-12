import React from 'react';
import { createLocal } from 'shared/components/utils/localnames';
import Counter from 'shared/components/organisms/Counter';
import styles from './styles.scss';

const { localNames: local } = createLocal(styles);

export default function Footer(props) {
  return (
    <footer className={local('root')}>
      <Counter />
    </footer>
  );
}
