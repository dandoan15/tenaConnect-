var db = db.getSiblingDB('tenaconnectdb');
 
db.createCollection('tenantMessages')
tenantMsg = db.getCollection('tenantMessages');
tenantMsg.remove({});
 
tenantMsg.insert(
    {
        MessageID: "0000000001",
        Category: 'Bathroom',
        Subject: 'Can you fix my toilet?',
        Date: '4/8/2016',
        Time: '2:44 PM',
        From: 'T0002910',
        To: 'L0000001',
        Message: 'Dear Landlord, Could you swing by soon to fix my toilet since its all clogged up and it has been clogged since this morning. Thanks, Jack Ryder',
        Reply: ''

    });

tenantMsg.insert(
    {
        MessageID: "0000224469",
        Category: 'Bathroom',
        Subject: 'My head shower is broken',
        Date: '4/1/2016',
        Time: '3:04 AM',
        From: 'T0002145',
        To: 'L0000001',
        Message: 'Dear Landlord, you need to fix my head shower!! Thanks, Veronica Vreeland',
        Reply: '',
    });

tenantMsg.insert(
    {
        MessageID: "0000366548",
        Category: 'Pest Infestation',
        Subject: 'Cockroach in my kitchen!!',
        Date: '5/9/2016',
        Time: '5:38 PM',
        From: 'T0003221',
        To: 'L0000001',
        Message: 'Dear Landlord, you need to get rid of these cochroaches ASAP!',
        Reply: '',
    });

tenantMsg.insert(
    {
        MessageID: "0000225639",
        Category: 'Payment',
        Subject: 'Missed Payment',
        Date: '5/9/2016',
        Time: '5:38 PM',
        From: 'L0000001',
        To: 'T0003221',
        Message: "Hey Harvey, I just wanted to let you know that you didn't pay your rent this month.  You need to pay that as soon as possible includeing the Late Fee.  Thanks, Tom the Landlord",
        Reply: '',
    });

tenantMsg.insert(
    {
        MessageID: "0000000001",
        Category: 'Plumbing',
        Subject: 'Water off',
        Date: '6/4/2016',
        Time: '1:32 PM',
        From: 'L0000001',
        To: 'BulletinBoard',
        Message: 'Reminder: \n The Water to the building will be shut off between 12:00pm and 2:00pm for some much needed plumbing repairs.  Please plan ahead.  We will get the water back on as soon as possible',
        Reply: ''

    });