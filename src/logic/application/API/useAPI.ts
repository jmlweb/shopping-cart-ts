import { useContext } from 'react';

import APIContext, { Value } from './APIContext';

const useAPI = (): Value => useContext(APIContext);

export default useAPI;
