import * as indexSchema from './schema';
import * as authSchema from './schema/auth-schema';
import * as relations from './schema/relations';

const tables = { ...indexSchema, ...authSchema, ...relations };

export default tables;
