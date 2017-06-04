var db = db.getSiblingDB('tenaconnectdb');

db.createCollection('tenantDues');
listsCollection = db.getCollection("tenantDues");
listsCollection.remove({});
listsCollection.insert(
    {
        TenantID: 'T0002910',
        Rent: 1850.00,
        Utilities: 75.00,
        LateFee: 25.00,
        gracePeriod: 3,
        Payment: [
            {
                PaymentID: '0001457',
                Amount: 1850.00,
                Description: 'Rent',
                dueDate: '06/01/2016',
                lastDay: '06/03/2016'
            },
            {
                PaymentID: '0001458',
                Amount: 75.00,
                Description: 'Utilities',
                dueDate: '06/01/2016',
                lastDay: '06/03/2016'
            }
        ]
    });

listsCollection.insert(
    {
        TenantID: 'T0002145',
        Rent: 1800.00,
        Utilities: 75.00,
        LateFee: 25.00,
        gracePeriod: 3,
        Payment: [
            {
                PaymentID: '0001763',
                Amount: 1800.00,
                Description: 'Rent',
                dueDate: '06/01/2016',
                lastDay: '06/03/2016'
            },
            {
                PaymentID: '0001764',
                Amount: 75.00,
                Description: 'Utilities',
                dueDate: '06/01/2016',
                lastDay: '06/03/2016'
            }
        ]
    });

listsCollection.insert(
    {
        TenantID: 'T0003789',
        Rent: 2016.00,
        Utilities: 75.00,
        LateFee: 25.00,
        gracePeriod: 3,
        Payment: [
            {
                PaymentID: '0001597',
                Amount: 2016.00,
                Description: 'Rent',
                dueDate: '06/01/2016',
                lastDay: '06/03/2016'
            },
            {
                PaymentID: '0001598',
                Amount: 75.00,
                Description: 'Utilities',
                dueDate: '06/01/2016',
                lastDay: '06/03/2016'
            }
        ]
    });

listsCollection.insert(
    {
        TenantID: 'T0003221',
        Rent: 1070.00,
        Utilities: 75.00,
        LateFee: 25.00,
        gracePeriod: 3,
        Payment: [
            {
                PaymentID: '0001245',
                Amount: 1070.00,
                Description: 'Rent',
                dueDate: '06/01/2016',
                lastDay: '06/03/2016'
            },
            {
                PaymentID: '0001246',
                Amount: 75.00,
                Description: 'Utilities',
                dueDate: '06/01/2016',
                lastDay: '06/03/2016'
            },
            {
                PaymentID: '0001244',
                Amount: 25.00,
                Description: 'Late Fee',
                dueDate: '06/01/2016',
                lastDay: '06/03/2016'
            },
            {
                PaymentID: '0001242',
                Amount: 1070.00,
                Description: 'Rent',
                dueDate: '05/01/2016',
                lastDay: '05/03/2016'
            },
            {
                PaymentID: '0001243',
                Amount: 75.00,
                Description: 'Utilities',
                dueDate: '05/01/2016',
                lastDay: '05/03/2016'
            }
        ]
    });

listsCollection.insert(
    {
        TenantID: 'T0001943',
        Rent: 1045.00,
        Utilities: 75.00,
        LateFee: 25.00,
        gracePeriod: 3,
        Payment: [
            {
                PaymentID: '0001776',
                Amount: 1045.00,
                Description: 'Rent',
                dueDate: '06/01/2016',
                lastDay: '06/03/2016'
            },
            {
                PaymentID: '0001777',
                Amount: 75.00,
                Description: 'Utilities',
                dueDate: '06/01/2016',
                lastDay: '06/03/2016'
            }
        ]
    });