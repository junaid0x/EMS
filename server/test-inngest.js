import { inngest } from './inngest/index.js';

(async () => {
  try {
    console.log('Sending test event to inngest...');
    console.log('INNGEST_EVENT_KEY present:', process.env.INNGEST_EVENT_KEY ? process.env.INNGEST_EVENT_KEY.slice(0,8) + '...' : 'MISSING');
    const res = await inngest.send({
      name: 'employee/check-out',
      data: {
        employeeId: '000000000000000000000000',
        attendanceId: '000000000000000000000000'
      }
    });

    console.log('inngest.send result:', res);
    process.exit(0);
  } catch (err) {
    console.error('Error sending test event:', err);
    process.exit(1);
  }
})();