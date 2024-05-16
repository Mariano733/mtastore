import mysql from 'mysql';
import keys from '../keys';

const connetion = mysql.createConnection(keys);

export default connetion;