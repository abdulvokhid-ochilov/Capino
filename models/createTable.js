const connection = require('./configdb');

// console.log(connection)

const createOutputTable = async () => {
  try {
    const result = await connection;
    // await result.execute('drop table output')
    await result.execute(`create table output(
      bl_num varchar2(20) not null primary key,
      company_name varchar2(30) not null,
      quantity number  not null check(quantity >= 0), 
      unit varchar2(20) not null,
      enter_date date not null)`);
  } catch (err) {
    console.log(err);
  }
}


const createOutputHistory = async () => {
  try {
    const result = await connection
    await result.execute('drop table output_history')
    await result.execute(`create table output_history(
      driver_name varchar2(20) not null,
      phone_num varchar(20) not null,
      car_num varchar2(20) not null,
      transaction_id varchar2(20) not null primary key,
      bl_num varchar2(20) not null,
      quantity number  not null, 
      unit varchar2(20) not null,
      dt date default sysdate, 
      constraint fk_bl foreign key(bl_num) 
      references output(bl_num))`);
  } catch (err) {
    console.log(err);
  }
}

const insert_output = async () => {
  try {
    const result = await connection
    const sql = 'INSERT INTO output VALUES(:bl_num, :company_name, :quantity, :unit, :enter_date)';
    const binds = [
      {
        bl_num: 'HSLI024277300006J',
        company_name: 'YUJIN INTERNATIONAL',
        quantity: 500,
        unit: 'box',
        enter_date: new Date('2021-05-25')
      },
      {
        bl_num: 'ABCD024277300006J',
        company_name: 'Samsung',
        quantity: 1000,
        unit: 'box',
        enter_date: new Date('2021-05-26')
      },
      {
        bl_num: 'BCDA024277300006J',
        company_name: 'Samsung chemical',
        quantity: 500,
        unit: 'kg',
        enter_date: new Date('2021-05-27')
      }
    ]
    const data = await result.executeMany(sql, binds, { autoCommit: true })
  } catch (err) {
    console.log(err);
  }
}


if (process.argv[2] === '--output') {
  createOutputTable()
} else if (process.argv[2] === '--output_history') {
  createOutputHistory()
} else if (process.argv[2] === '--insert_output') {
  insert_output()
}