const connection = require('./configdb');

// console.log(connection)

const createOutputTable = async () => {
  try {
    const result = await connection;
    // await result.execute('drop table output')
    await result.execute(`create table output(
      bl_num varchar2(20) not null primary key,
      company_name varchar2(30) not null,
      forwarder varchar2(20) not null,
      type varchar2(20) not null,
      quantity number  not null check(quantity >= 0), 
      unit varchar2(20) not null,
      enter_date date not null)`);
  } catch (err) {
    console.log(err);
  }
}

const insert_output = async () => {
  try {
    const result = await connection
    const sql = 'INSERT INTO output VALUES(:bl_num, :company_name, :forwarder, :type, :quantity, :unit, :enter_date)';
    const binds = [
      {
        bl_num: 'HSLI024277300006J',
        company_name: 'YUJIN INTERNATIONAL',
        forwarder: '지티지',
        type: 'INFLATABLE',
        quantity: 500,
        unit: 'box',
        enter_date: new Date('2021-05-25')
      },
      {
        bl_num: 'ABCD024277300006J',
        company_name: 'Samsung',
        forwarder: '지티지',
        type: 'INFLATABLE',
        quantity: 1000,
        unit: 'box',
        enter_date: new Date('2021-05-26')
      },
      {
        bl_num: 'BCDA024277300006J',
        company_name: 'Samsung chemical',
        forwarder: '지티지',
        type: 'INFLATABLE',
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

const createOutputHistory = async () => {
  try {
    const result = await connection
    // await result.execute('drop table output_history')
    await result.execute(`create table output_history(
      driver_name varchar2(20) not null,
      phone_num char(11) not null,
      car_num varchar2(20) not null,
      transaction_id varchar2(30) not null,
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


const createInputTable = async () => {
  try {
    const result = await connection;
    await result.execute('drop table input');
    await result.execute(`create table input(
      transaction_id varchar2(30) not null,
      enter_date date not null,
      driver_name varchar2(20) not null,
      phone_number char(11) not null,
      car_number varchar2(20) not null,
      forwarder varchar2(20) not null,
      destination_port varchar2(20) not null,
      sonmyong varchar2(20) not null,
      booking_num varchar2(20) not null,
      departure_date date not null,
      company_name varchar2(20) not null,
      quantity number not null,
      package varchar2(10) not null,
      weight number not null,
      volume number not null 
    )`)
  } catch (err) {
    console.log(err);
  }
}
const sampleInputData = {
  driver_name: '홍길동',
  phone_num: 01033721707,
  car_num: '02허 9757',
  forwarder: '한중훠리',//(선사/포워더)
  destinationPort: 'CNYNT',//(도착항)
  sonmyong: '선명/황자',//(선명/황자)
  booking_num: 'booking_num',//(부킹넘버)
  departure_date: '01-11-2021',
  com_name: 'YUJIN INTERNATIONAL',//(화주명(상호))    
  amount: 500,//(입고수량)
  package: 'box',//(포장규격)
  weight: 100, //(중량(kg)
  volume: 10, //(용적(cbm)
}


if (process.argv[2] === '--output') {
  createOutputTable()
} else if (process.argv[2] === '--output_history') {
  createOutputHistory()
} else if (process.argv[2] === '--insert_output') {
  insert_output()
} else if (process.argv[2] === '--input') {
  createInputTable()
}