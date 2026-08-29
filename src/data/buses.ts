import { BusService, Depot } from '@/types/bus';

export const DEPOTS: Depot[] = [
  { id: 'AMBALA_CANTT', name: 'Ambala Cantt', nameHi: 'अम्बाला कैंट', contactNumber: '0171-2530472', address: 'GT Road, Ambala Cantt' },
  { id: 'AMBALA_CITY', name: 'Ambala City', nameHi: 'अम्बाला सिटी', contactNumber: '0171-2550123', address: 'Old Bus Stand, Ambala City' },
  { id: 'CHANDIGARH_17', name: 'Chandigarh ISBT-17', nameHi: 'चंडीगढ़ ISBT-17', contactNumber: '0172-2704014', address: 'Sector 17 ISBT, Chandigarh' },
  { id: 'CHANDIGARH_43', name: 'Chandigarh ISBT-43', nameHi: 'चंडीगढ़ ISBT-43', contactNumber: '0172-2606672', address: 'Sector 43 ISBT, Chandigarh' },
  { id: 'DELHI_ISBT', name: 'Delhi ISBT Kashmiri Gate', nameHi: 'दिल्ली कश्मीरी गेट', contactNumber: '011-23865181', address: 'Maharana Pratap ISBT, New Delhi' },
  { id: 'GURUGRAM', name: 'Gurugram', nameHi: 'गुरुग्राम', contactNumber: '0124-2320222', address: 'Near Mahavir Chowk, Gurugram' },
  { id: 'HISAR', name: 'Hisar', nameHi: 'हिसार', contactNumber: '01662-233285', address: 'Main Bus Stand, Hisar' },
  { id: 'KARNAL', name: 'Karnal', nameHi: 'करनाल', contactNumber: '0184-2252119', address: 'Near NDRI Chowk, Karnal' },
  { id: 'PANIPAT', name: 'Panipat', nameHi: 'पानीपत', contactNumber: '0180-2646544', address: 'GT Road, Panipat' },
  { id: 'ROHTAK', name: 'Rohtak', nameHi: 'रोहतक', contactNumber: '01262-276641', address: 'Delhi Bypass, Rohtak' },
  { id: 'SONIPAT', name: 'Sonipat', nameHi: 'सोनीपत', contactNumber: '0130-2242405', address: 'Main Bus Stand, Sonipat' },
  { id: 'FARIDABAD', name: 'Faridabad (Ballabgarh)', nameHi: 'फरीदाबाद (बल्लभगढ़)', contactNumber: '0129-2241512', address: 'Ballabgarh Bus Stand' },
  { id: 'KURUKSHETRA', name: 'Kurukshetra (Pipli)', nameHi: 'कुरुक्षेत्र (पिपली)', contactNumber: '01744-220042', address: 'Pipli Bus Stand, Kurukshetra' },
  { id: 'YAMUNANAGAR', name: 'Yamunanagar (Jagadhri)', nameHi: 'यमुनानगर (जगाधरी)', contactNumber: '01732-227717', address: 'Jagadhri Bus Stand, Yamunanagar' },
  { id: 'REWARI', name: 'Rewari', nameHi: 'रेवाड़ी', contactNumber: '01274-256751', address: 'Circular Road, Rewari' },
  { id: 'NARNAUL', name: 'Narnaul', nameHi: 'नारनौल', contactNumber: '01282-251341', address: 'Singhana Road, Narnaul' },
  { id: 'BHIWANI', name: 'Bhiwani', nameHi: 'भिवानी', contactNumber: '01664-242352', address: 'Hansi Gate, Bhiwani' },
  { id: 'SIRSA', name: 'Sirsa', nameHi: 'सिरसा', contactNumber: '01666-220468', address: 'Barnala Road, Sirsa' },
  { id: 'FATEHABAD', name: 'Fatehabad', nameHi: 'फतेहाबाद', contactNumber: '01667-220054', address: 'GT Road, Fatehabad' },
  { id: 'JIND', name: 'Jind', nameHi: 'जींद', contactNumber: '01681-255315', address: 'Safidon Road, Jind' },
  { id: 'KAITHAL', name: 'Kaithal', nameHi: 'कैथल', contactNumber: '01746-234234', address: 'Karnal Road, Kaithal' },
  { id: 'JHAJJAR', name: 'Jhajjar', nameHi: 'झज्जर', contactNumber: '01251-252128', address: 'Rewari Road, Jhajjar' },
  { id: 'PALWAL', name: 'Palwal', nameHi: 'पलवल', contactNumber: '01275-252250', address: 'Agra Road, Palwal' },
  { id: 'NUH', name: 'Nuh (Mewat)', nameHi: 'नूह', contactNumber: '01267-274644', address: 'Main Bus Stand, Nuh' },
  { id: 'CHARKHI_DADRI', name: 'Charkhi Dadri', nameHi: 'चरखी दादरी', contactNumber: '01250-222123', address: 'Loharu Road, Charkhi Dadri' },
  { id: 'PANCHKULA', name: 'Panchkula', nameHi: 'पंचकूला', contactNumber: '0172-2560321', address: 'Sector 5 Bus Stand, Panchkula' },
  { id: 'KALKA', name: 'Kalka Sub-Depot', nameHi: 'कालका', contactNumber: '01733-220230', address: 'Railway Station Road, Kalka' },
  { id: 'GOHANA', name: 'Gohana Sub-Depot', nameHi: 'गोहाना', contactNumber: '01263-252230', address: 'Rohtak Road, Gohana' },
  { id: 'DABWALI', name: 'Mandi Dabwali Sub-Depot', nameHi: 'डबवाली', contactNumber: '01668-222340', address: 'Bathinda Road, Mandi Dabwali' },
  { id: 'TOHANA', name: 'Tohana Sub-Depot', nameHi: 'टोहाना', contactNumber: '01692-230140', address: 'Hisar Road, Tohana' },
  { id: 'HANSI', name: 'Hansi Sub-Depot', nameHi: 'हांसी', contactNumber: '01663-254120', address: 'Delhi Road, Hansi' },
  { id: 'BAHADURGARH', name: 'Bahadurgarh Bus Stand', nameHi: 'बहादुरगढ़', contactNumber: '01276-231140', address: 'Delhi Bypass, Bahadurgarh' },
  { id: 'PEHOWA', name: 'Pehowa Bus Stand', nameHi: 'पिहोवा', contactNumber: '01741-220130', address: 'Kaithal Road, Pehowa' },
  { id: 'KOSLI', name: 'Kosli Sub-Depot', nameHi: 'कोसली', contactNumber: '01259-275140', address: 'Railway Station Road, Kosli' }
];

export const DEPOT_HELPLINES = DEPOTS.map((d: Depot) => ({
  depot: d.name,
  depotHi: d.nameHi || d.name,
  phone: d.contactNumber || '0172-2704014',
  location: d.address || 'Haryana Roadways Stand',
}));

export const BUS_SERVICES: BusService[] = [
  // Ambala Cantt Services
  {
    id: 'AMB-DEL-01',
    busNumber: 'HR-01-EA-1001',
    depotId: 'AMBALA_CANTT',
    depotName: 'Ambala Cantt',
    depotNameHi: 'अम्बाला कैंट',
    origin: 'Ambala Cantt',
    originHi: 'अम्बाला कैंट',
    destination: 'Delhi ISBT Kashmiri Gate',
    destinationHi: 'दिल्ली कश्मीरी गेट',
    departureTime: '04:30',
    arrivalTime: '08:30',
    fleetType: 'ORDINARY',
    fare: 215,
    routeVia: ['Kurukshetra (Pipli)', 'Karnal', 'Panipat', 'Murthal'],
    intermediateStops: [
      { name: 'Kurukshetra (Pipli)', time: '05:15', fareFromOrigin: 45 },
      { name: 'Karnal', time: '06:00', fareFromOrigin: 85 },
      { name: 'Panipat', time: '06:50', fareFromOrigin: 135 },
      { name: 'Delhi ISBT Kashmiri Gate', time: '08:30', fareFromOrigin: 215 }
    ],
    helpline: '0171-2530472'
  },
  {
    id: 'AMB-DEL-02',
    busNumber: 'HR-01-EA-1002',
    depotId: 'AMBALA_CANTT',
    depotName: 'Ambala Cantt',
    depotNameHi: 'अम्बाला कैंट',
    origin: 'Ambala Cantt',
    destination: 'Delhi ISBT Kashmiri Gate',
    destinationHi: 'दिल्ली कश्मीरी गेट',
    departureTime: '06:00',
    arrivalTime: '10:00',
    fleetType: 'HVAC',
    fare: 290,
    routeVia: ['Kurukshetra (Pipli)', 'Karnal', 'Panipat', 'Murthal'],
    intermediateStops: [
      { name: 'Kurukshetra (Pipli)', time: '06:45', fareFromOrigin: 60 },
      { name: 'Karnal', time: '07:30', fareFromOrigin: 110 },
      { name: 'Panipat', time: '08:20', fareFromOrigin: 180 },
      { name: 'Delhi ISBT Kashmiri Gate', time: '10:00', fareFromOrigin: 290 }
    ],
    helpline: '0171-2530472'
  },
  {
    id: 'AMB-DEL-03',
    busNumber: 'HR-01-GA-1003',
    depotId: 'AMBALA_CANTT',
    depotName: 'Ambala Cantt',
    depotNameHi: 'अम्बाला कैंट',
    origin: 'Ambala Cantt',
    destination: 'Delhi ISBT Kashmiri Gate',
    destinationHi: 'दिल्ली कश्मीरी गेट',
    departureTime: '08:15',
    arrivalTime: '12:15',
    fleetType: 'ORDINARY',
    fare: 215,
    routeVia: ['Kurukshetra (Pipli)', 'Karnal', 'Panipat'],
    intermediateStops: [
      { name: 'Kurukshetra (Pipli)', time: '09:00', fareFromOrigin: 45 },
      { name: 'Karnal', time: '09:45', fareFromOrigin: 85 },
      { name: 'Panipat', time: '10:35', fareFromOrigin: 135 },
      { name: 'Delhi ISBT Kashmiri Gate', time: '12:15', fareFromOrigin: 215 }
    ],
    helpline: '0171-2530472'
  },
  {
    id: 'AMB-DEL-04',
    busNumber: 'HR-01-EA-1004',
    depotId: 'AMBALA_CANTT',
    depotName: 'Ambala Cantt',
    depotNameHi: 'अम्बाला कैंट',
    origin: 'Ambala Cantt',
    destination: 'Delhi ISBT Kashmiri Gate',
    destinationHi: 'दिल्ली कश्मीरी गेट',
    departureTime: '11:00',
    arrivalTime: '15:00',
    fleetType: 'ORDINARY',
    fare: 215,
    routeVia: ['Kurukshetra (Pipli)', 'Karnal', 'Panipat'],
    intermediateStops: [
      { name: 'Kurukshetra (Pipli)', time: '11:45', fareFromOrigin: 45 },
      { name: 'Karnal', time: '12:30', fareFromOrigin: 85 },
      { name: 'Panipat', time: '13:20', fareFromOrigin: 135 },
      { name: 'Delhi ISBT Kashmiri Gate', time: '15:00', fareFromOrigin: 215 }
    ],
    helpline: '0171-2530472'
  },
  {
    id: 'AMB-DEL-05',
    busNumber: 'HR-01-EA-1005',
    depotId: 'AMBALA_CANTT',
    depotName: 'Ambala Cantt',
    depotNameHi: 'अम्बाला कैंट',
    origin: 'Ambala Cantt',
    destination: 'Delhi ISBT Kashmiri Gate',
    destinationHi: 'दिल्ली कश्मीरी गेट',
    departureTime: '14:30',
    arrivalTime: '18:30',
    fleetType: 'HVAC',
    fare: 290,
    routeVia: ['Kurukshetra (Pipli)', 'Karnal', 'Panipat'],
    intermediateStops: [
      { name: 'Kurukshetra (Pipli)', time: '15:15', fareFromOrigin: 60 },
      { name: 'Karnal', time: '16:00', fareFromOrigin: 110 },
      { name: 'Panipat', time: '16:50', fareFromOrigin: 180 },
      { name: 'Delhi ISBT Kashmiri Gate', time: '18:30', fareFromOrigin: 290 }
    ],
    helpline: '0171-2530472'
  },
  {
    id: 'AMB-DEL-06',
    busNumber: 'HR-01-GA-1006',
    depotId: 'AMBALA_CANTT',
    depotName: 'Ambala Cantt',
    depotNameHi: 'अम्बाला कैंट',
    origin: 'Ambala Cantt',
    destination: 'Delhi ISBT Kashmiri Gate',
    destinationHi: 'दिल्ली कश्मीरी गेट',
    departureTime: '17:45',
    arrivalTime: '21:45',
    fleetType: 'ORDINARY',
    fare: 215,
    routeVia: ['Kurukshetra (Pipli)', 'Karnal', 'Panipat'],
    intermediateStops: [
      { name: 'Kurukshetra (Pipli)', time: '18:30', fareFromOrigin: 45 },
      { name: 'Karnal', time: '19:15', fareFromOrigin: 85 },
      { name: 'Panipat', time: '20:05', fareFromOrigin: 135 },
      { name: 'Delhi ISBT Kashmiri Gate', time: '21:45', fareFromOrigin: 215 }
    ],
    helpline: '0171-2530472'
  },
  {
    id: 'AMB-DEL-07',
    busNumber: 'HR-01-EA-1007',
    depotId: 'AMBALA_CANTT',
    depotName: 'Ambala Cantt',
    depotNameHi: 'अम्बाला कैंट',
    origin: 'Ambala Cantt',
    destination: 'Delhi ISBT Kashmiri Gate',
    destinationHi: 'दिल्ली कश्मीरी गेट',
    departureTime: '20:30',
    arrivalTime: '00:30',
    fleetType: 'VOLVO',
    fare: 460,
    routeVia: ['Karnal Bypass', 'Panipat Toll'],
    intermediateStops: [
      { name: 'Karnal', time: '21:45', fareFromOrigin: 210 },
      { name: 'Delhi ISBT Kashmiri Gate', time: '00:30', fareFromOrigin: 460 }
    ],
    helpline: '0171-2530472'
  },

  // Ambala Cantt to Narnaul
  {
    id: 'AMB-NAR-01',
    busNumber: 'HR-01-GA-2001',
    depotId: 'AMBALA_CANTT',
    depotName: 'Ambala Cantt',
    depotNameHi: 'अम्बाला कैंट',
    origin: 'Ambala Cantt',
    destination: 'Narnaul',
    destinationHi: 'नारनौल',
    departureTime: '05:15',
    arrivalTime: '11:45',
    fleetType: 'ORDINARY',
    fare: 295,
    routeVia: ['Ambala City', 'Kurukshetra (Pipli)', 'Kaithal', 'Jind', 'Rohtak', 'Jhajjar', 'Rewari'],
    intermediateStops: [
      { name: 'Ambala City', time: '05:30', fareFromOrigin: 15 },
      { name: 'Kurukshetra (Pipli)', time: '06:15', fareFromOrigin: 50 },
      { name: 'Kaithal', time: '07:30', fareFromOrigin: 100 },
      { name: 'Jind', time: '08:45', fareFromOrigin: 160 },
      { name: 'Rohtak', time: '10:00', fareFromOrigin: 220 },
      { name: 'Rewari', time: '11:00', fareFromOrigin: 265 },
      { name: 'Narnaul', time: '11:45', fareFromOrigin: 295 }
    ],
    helpline: '0171-2530472'
  },
  {
    id: 'AMB-NAR-02',
    busNumber: 'HR-01-GA-2002',
    depotId: 'AMBALA_CANTT',
    depotName: 'Ambala Cantt',
    depotNameHi: 'अम्बाला कैंट',
    origin: 'Ambala Cantt',
    destination: 'Narnaul',
    destinationHi: 'नारनौल',
    departureTime: '08:30',
    arrivalTime: '15:00',
    fleetType: 'ORDINARY',
    fare: 295,
    routeVia: ['Ambala City', 'Kaithal', 'Jind', 'Rohtak', 'Rewari'],
    intermediateStops: [
      { name: 'Ambala City', time: '08:45', fareFromOrigin: 15 },
      { name: 'Kaithal', time: '10:45', fareFromOrigin: 100 },
      { name: 'Rohtak', time: '13:15', fareFromOrigin: 220 },
      { name: 'Narnaul', time: '15:00', fareFromOrigin: 295 }
    ],
    helpline: '0171-2530472'
  },
  {
    id: 'AMB-NAR-03',
    busNumber: 'HR-01-GA-2003',
    depotId: 'AMBALA_CANTT',
    depotName: 'Ambala Cantt',
    depotNameHi: 'अम्बाला कैंट',
    origin: 'Ambala Cantt',
    destination: 'Narnaul',
    destinationHi: 'नारनौल',
    departureTime: '13:15',
    arrivalTime: '19:45',
    fleetType: 'HVAC',
    fare: 390,
    routeVia: ['Kurukshetra (Pipli)', 'Kaithal', 'Jind', 'Rohtak', 'Rewari'],
    intermediateStops: [
      { name: 'Kaithal', time: '15:30', fareFromOrigin: 135 },
      { name: 'Rohtak', time: '17:45', fareFromOrigin: 290 },
      { name: 'Narnaul', time: '19:45', fareFromOrigin: 390 }
    ],
    helpline: '0171-2530472'
  },

  // Ambala City Services
  {
    id: 'AMC-CHD-01',
    busNumber: 'HR-01-AB-3001',
    depotId: 'AMBALA_CITY',
    depotName: 'Ambala City',
    depotNameHi: 'अम्बाला सिटी',
    origin: 'Ambala City',
    destination: 'Chandigarh ISBT-17',
    destinationHi: 'चंडीगढ़ ISBT-17',
    departureTime: '06:00',
    arrivalTime: '07:15',
    fleetType: 'ORDINARY',
    fare: 65,
    routeVia: ['Ambala Cantt', 'Zirakpur', 'Tribune Chowk'],
    intermediateStops: [
      { name: 'Ambala Cantt', time: '06:15', fareFromOrigin: 15 },
      { name: 'Zirakpur', time: '06:50', fareFromOrigin: 45 },
      { name: 'Chandigarh ISBT-17', time: '07:15', fareFromOrigin: 65 }
    ],
    helpline: '0171-2550123'
  },
  {
    id: 'AMC-CHD-02',
    busNumber: 'HR-01-AB-3002',
    depotId: 'AMBALA_CITY',
    depotName: 'Ambala City',
    depotNameHi: 'अम्बाला सिटी',
    origin: 'Ambala City',
    destination: 'Chandigarh ISBT-17',
    destinationHi: 'चंडीगढ़ ISBT-17',
    departureTime: '08:00',
    arrivalTime: '09:15',
    fleetType: 'ORDINARY',
    fare: 65,
    routeVia: ['Ambala Cantt', 'Zirakpur'],
    intermediateStops: [
      { name: 'Ambala Cantt', time: '08:15', fareFromOrigin: 15 },
      { name: 'Chandigarh ISBT-17', time: '09:15', fareFromOrigin: 65 }
    ],
    helpline: '0171-2550123'
  },
  {
    id: 'AMC-CHD-03',
    busNumber: 'HR-01-AB-3003',
    depotId: 'AMBALA_CITY',
    depotName: 'Ambala City',
    depotNameHi: 'अम्बाला सिटी',
    origin: 'Ambala City',
    destination: 'Chandigarh ISBT-17',
    destinationHi: 'चंडीगढ़ ISBT-17',
    departureTime: '11:30',
    arrivalTime: '12:45',
    fleetType: 'ORDINARY',
    fare: 65,
    routeVia: ['Ambala Cantt', 'Zirakpur'],
    intermediateStops: [
      { name: 'Ambala Cantt', time: '11:45', fareFromOrigin: 15 },
      { name: 'Chandigarh ISBT-17', time: '12:45', fareFromOrigin: 65 }
    ],
    helpline: '0171-2550123'
  },
  {
    id: 'AMC-CHD-04',
    busNumber: 'HR-01-AB-3004',
    depotId: 'AMBALA_CITY',
    depotName: 'Ambala City',
    depotNameHi: 'अम्बाला सिटी',
    origin: 'Ambala City',
    destination: 'Chandigarh ISBT-17',
    destinationHi: 'चंडीगढ़ ISBT-17',
    departureTime: '15:15',
    arrivalTime: '16:30',
    fleetType: 'ORDINARY',
    fare: 65,
    routeVia: ['Ambala Cantt', 'Zirakpur'],
    intermediateStops: [
      { name: 'Ambala Cantt', time: '15:30', fareFromOrigin: 15 },
      { name: 'Chandigarh ISBT-17', time: '16:30', fareFromOrigin: 65 }
    ],
    helpline: '0171-2550123'
  },
  {
    id: 'AMC-CHD-05',
    busNumber: 'HR-01-AB-3005',
    depotId: 'AMBALA_CITY',
    depotName: 'Ambala City',
    depotNameHi: 'अम्बाला सिटी',
    origin: 'Ambala City',
    destination: 'Chandigarh ISBT-17',
    destinationHi: 'चंडीगढ़ ISBT-17',
    departureTime: '18:45',
    arrivalTime: '20:00',
    fleetType: 'ORDINARY',
    fare: 65,
    routeVia: ['Ambala Cantt', 'Zirakpur'],
    intermediateStops: [
      { name: 'Ambala Cantt', time: '19:00', fareFromOrigin: 15 },
      { name: 'Chandigarh ISBT-17', time: '20:00', fareFromOrigin: 65 }
    ],
    helpline: '0171-2550123'
  },

  // Ambala City to Hisar
  {
    id: 'AMC-HIS-01',
    busNumber: 'HR-01-AB-4001',
    depotId: 'AMBALA_CITY',
    depotName: 'Ambala City',
    depotNameHi: 'अम्बाला सिटी',
    origin: 'Ambala City',
    destination: 'Hisar',
    destinationHi: 'हिसार',
    departureTime: '06:45',
    arrivalTime: '11:15',
    fleetType: 'ORDINARY',
    fare: 230,
    routeVia: ['Pehowa Bus Stand', 'Kaithal', 'Narwana', 'Barwala'],
    intermediateStops: [
      { name: 'Pehowa Bus Stand', time: '07:45', fareFromOrigin: 60 },
      { name: 'Kaithal', time: '08:30', fareFromOrigin: 105 },
      { name: 'Hisar', time: '11:15', fareFromOrigin: 230 }
    ],
    helpline: '0171-2550123'
  },
  {
    id: 'AMC-HIS-02',
    busNumber: 'HR-01-AB-4002',
    depotId: 'AMBALA_CITY',
    depotName: 'Ambala City',
    depotNameHi: 'अम्बाला सिटी',
    origin: 'Ambala City',
    destination: 'Hisar',
    destinationHi: 'हिसार',
    departureTime: '12:30',
    arrivalTime: '17:00',
    fleetType: 'ORDINARY',
    fare: 230,
    routeVia: ['Pehowa Bus Stand', 'Kaithal', 'Narwana', 'Barwala'],
    intermediateStops: [
      { name: 'Kaithal', time: '14:15', fareFromOrigin: 105 },
      { name: 'Hisar', time: '17:00', fareFromOrigin: 230 }
    ],
    helpline: '0171-2550123'
  },

  // Chandigarh Services
  {
    id: 'CHD-DEL-01',
    busNumber: 'HR-68-AA-1001',
    depotId: 'CHANDIGARH_17',
    depotName: 'Chandigarh ISBT-17',
    depotNameHi: 'चंडीगढ़ ISBT-17',
    origin: 'Chandigarh ISBT-17',
    destination: 'Delhi ISBT Kashmiri Gate',
    destinationHi: 'दिल्ली कश्मीरी गेट',
    departureTime: '05:00',
    arrivalTime: '09:45',
    fleetType: 'VOLVO',
    fare: 540,
    routeVia: ['Ambala Cantt', 'Karnal Bypass', 'Panipat Toll'],
    intermediateStops: [
      { name: 'Ambala Cantt', time: '05:55', fareFromOrigin: 120 },
      { name: 'Karnal', time: '07:15', fareFromOrigin: 270 },
      { name: 'Delhi ISBT Kashmiri Gate', time: '09:45', fareFromOrigin: 540 }
    ],
    helpline: '0172-2704014'
  },
  {
    id: 'CHD-DEL-02',
    busNumber: 'HR-68-AA-1002',
    depotId: 'CHANDIGARH_17',
    depotName: 'Chandigarh ISBT-17',
    depotNameHi: 'चंडीगढ़ ISBT-17',
    origin: 'Chandigarh ISBT-17',
    destination: 'Delhi ISBT Kashmiri Gate',
    destinationHi: 'दिल्ली कश्मीरी गेट',
    departureTime: '07:00',
    arrivalTime: '11:45',
    fleetType: 'HVAC',
    fare: 350,
    routeVia: ['Ambala Cantt', 'Karnal', 'Panipat'],
    intermediateStops: [
      { name: 'Ambala Cantt', time: '07:55', fareFromOrigin: 80 },
      { name: 'Karnal', time: '09:15', fareFromOrigin: 175 },
      { name: 'Delhi ISBT Kashmiri Gate', time: '11:45', fareFromOrigin: 350 }
    ],
    helpline: '0172-2704014'
  },
  {
    id: 'CHD-DEL-03',
    busNumber: 'HR-68-AA-1003',
    depotId: 'CHANDIGARH_17',
    depotName: 'Chandigarh ISBT-17',
    depotNameHi: 'चंडीगढ़ ISBT-17',
    origin: 'Chandigarh ISBT-17',
    destination: 'Delhi ISBT Kashmiri Gate',
    destinationHi: 'दिल्ली कश्मीरी गेट',
    departureTime: '09:30',
    arrivalTime: '14:15',
    fleetType: 'ORDINARY',
    fare: 275,
    routeVia: ['Ambala Cantt', 'Kurukshetra (Pipli)', 'Karnal', 'Panipat'],
    intermediateStops: [
      { name: 'Ambala Cantt', time: '10:30', fareFromOrigin: 65 },
      { name: 'Karnal', time: '11:55', fareFromOrigin: 145 },
      { name: 'Panipat', time: '12:45', fareFromOrigin: 195 },
      { name: 'Delhi ISBT Kashmiri Gate', time: '14:15', fareFromOrigin: 275 }
    ],
    helpline: '0172-2704014'
  },
  {
    id: 'CHD-DEL-04',
    busNumber: 'HR-68-AA-1004',
    depotId: 'CHANDIGARH_17',
    depotName: 'Chandigarh ISBT-17',
    depotNameHi: 'चंडीगढ़ ISBT-17',
    origin: 'Chandigarh ISBT-17',
    destination: 'Delhi ISBT Kashmiri Gate',
    destinationHi: 'दिल्ली कश्मीरी गेट',
    departureTime: '13:00',
    arrivalTime: '17:45',
    fleetType: 'VOLVO',
    fare: 540,
    routeVia: ['Ambala Cantt', 'Karnal Bypass'],
    intermediateStops: [
      { name: 'Ambala Cantt', time: '13:55', fareFromOrigin: 120 },
      { name: 'Delhi ISBT Kashmiri Gate', time: '17:45', fareFromOrigin: 540 }
    ],
    helpline: '0172-2704014'
  },
  {
    id: 'CHD-DEL-05',
    busNumber: 'HR-68-AA-1005',
    depotId: 'CHANDIGARH_17',
    depotName: 'Chandigarh ISBT-17',
    depotNameHi: 'चंडीगढ़ ISBT-17',
    origin: 'Chandigarh ISBT-17',
    destination: 'Delhi ISBT Kashmiri Gate',
    destinationHi: 'दिल्ली कश्मीरी गेट',
    departureTime: '16:30',
    arrivalTime: '21:15',
    fleetType: 'HVAC',
    fare: 350,
    routeVia: ['Ambala Cantt', 'Karnal', 'Panipat'],
    intermediateStops: [
      { name: 'Ambala Cantt', time: '17:25', fareFromOrigin: 80 },
      { name: 'Delhi ISBT Kashmiri Gate', time: '21:15', fareFromOrigin: 350 }
    ],
    helpline: '0172-2704014'
  },
  {
    id: 'CHD-DEL-06',
    busNumber: 'HR-68-AA-1006',
    depotId: 'CHANDIGARH_17',
    depotName: 'Chandigarh ISBT-17',
    depotNameHi: 'चंडीगढ़ ISBT-17',
    origin: 'Chandigarh ISBT-17',
    destination: 'Delhi ISBT Kashmiri Gate',
    destinationHi: 'दिल्ली कश्मीरी गेट',
    departureTime: '21:00',
    arrivalTime: '01:45',
    fleetType: 'VOLVO',
    fare: 540,
    routeVia: ['Ambala Cantt', 'Karnal Bypass'],
    intermediateStops: [
      { name: 'Ambala Cantt', time: '21:55', fareFromOrigin: 120 },
      { name: 'Delhi ISBT Kashmiri Gate', time: '01:45', fareFromOrigin: 540 }
    ],
    helpline: '0172-2704014'
  },

  // Hisar to Delhi Services
  {
    id: 'HIS-DEL-01',
    busNumber: 'HR-20-C-1001',
    depotId: 'HISAR',
    depotName: 'Hisar',
    depotNameHi: 'हिसार',
    origin: 'Hisar',
    destination: 'Delhi ISBT Kashmiri Gate',
    destinationHi: 'दिल्ली कश्मीरी गेट',
    departureTime: '05:30',
    arrivalTime: '09:45',
    fleetType: 'ORDINARY',
    fare: 195,
    routeVia: ['Hansi Sub-Depot', 'Maham', 'Rohtak', 'Bahadurgarh Bus Stand'],
    intermediateStops: [
      { name: 'Hansi Sub-Depot', time: '06:00', fareFromOrigin: 30 },
      { name: 'Rohtak', time: '07:30', fareFromOrigin: 100 },
      { name: 'Bahadurgarh Bus Stand', time: '08:45', fareFromOrigin: 155 },
      { name: 'Delhi ISBT Kashmiri Gate', time: '09:45', fareFromOrigin: 195 }
    ],
    helpline: '01662-233285'
  },
  {
    id: 'HIS-DEL-02',
    busNumber: 'HR-20-C-1002',
    depotId: 'HISAR',
    depotName: 'Hisar',
    depotNameHi: 'हिसार',
    origin: 'Hisar',
    destination: 'Delhi ISBT Kashmiri Gate',
    destinationHi: 'दिल्ली कश्मीरी गेट',
    departureTime: '09:00',
    arrivalTime: '13:15',
    fleetType: 'HVAC',
    fare: 265,
    routeVia: ['Hansi Sub-Depot', 'Rohtak', 'Bahadurgarh Bus Stand'],
    intermediateStops: [
      { name: 'Rohtak', time: '11:00', fareFromOrigin: 135 },
      { name: 'Delhi ISBT Kashmiri Gate', time: '13:15', fareFromOrigin: 265 }
    ],
    helpline: '01662-233285'
  },
  {
    id: 'HIS-DEL-03',
    busNumber: 'HR-20-C-1003',
    depotId: 'HISAR',
    depotName: 'Hisar',
    depotNameHi: 'हिसार',
    origin: 'Hisar',
    destination: 'Delhi ISBT Kashmiri Gate',
    destinationHi: 'दिल्ली कश्मीरी गेट',
    departureTime: '13:30',
    arrivalTime: '17:45',
    fleetType: 'ORDINARY',
    fare: 195,
    routeVia: ['Hansi Sub-Depot', 'Maham', 'Rohtak'],
    intermediateStops: [
      { name: 'Rohtak', time: '15:30', fareFromOrigin: 100 },
      { name: 'Delhi ISBT Kashmiri Gate', time: '17:45', fareFromOrigin: 195 }
    ],
    helpline: '01662-233285'
  },
  {
    id: 'HIS-DEL-04',
    busNumber: 'HR-20-C-1004',
    depotId: 'HISAR',
    depotName: 'Hisar',
    depotNameHi: 'हिसार',
    origin: 'Hisar',
    destination: 'Delhi ISBT Kashmiri Gate',
    destinationHi: 'दिल्ली कश्मीरी गेट',
    departureTime: '17:15',
    arrivalTime: '21:30',
    fleetType: 'ORDINARY',
    fare: 195,
    routeVia: ['Hansi Sub-Depot', 'Rohtak', 'Bahadurgarh Bus Stand'],
    intermediateStops: [
      { name: 'Rohtak', time: '19:15', fareFromOrigin: 100 },
      { name: 'Delhi ISBT Kashmiri Gate', time: '21:30', fareFromOrigin: 195 }
    ],
    helpline: '01662-233285'
  },

  // Gurugram to Jaipur
  {
    id: 'GUR-JAI-01',
    busNumber: 'HR-55-B-1001',
    depotId: 'GURUGRAM',
    depotName: 'Gurugram',
    depotNameHi: 'गुरुग्राम',
    origin: 'Gurugram',
    destination: 'Jaipur Sindhi Camp',
    destinationHi: 'जयपुर सिंधी कैंप',
    departureTime: '06:00',
    arrivalTime: '10:30',
    fleetType: 'VOLVO',
    fare: 510,
    routeVia: ['Dharuhera', 'Kotputli', 'Shahpura'],
    intermediateStops: [
      { name: 'Kotputli', time: '08:15', fareFromOrigin: 280 },
      { name: 'Jaipur Sindhi Camp', time: '10:30', fareFromOrigin: 510 }
    ],
    helpline: '0124-2320222'
  },
  {
    id: 'GUR-JAI-02',
    busNumber: 'HR-55-B-1002',
    depotId: 'GURUGRAM',
    depotName: 'Gurugram',
    depotNameHi: 'गुरुग्राम',
    origin: 'Gurugram',
    destination: 'Jaipur Sindhi Camp',
    destinationHi: 'जयपुर सिंधी कैंप',
    departureTime: '08:30',
    arrivalTime: '13:00',
    fleetType: 'HVAC',
    fare: 360,
    routeVia: ['Dharuhera', 'Bawal', 'Kotputli', 'Shahpura'],
    intermediateStops: [
      { name: 'Kotputli', time: '10:45', fareFromOrigin: 195 },
      { name: 'Jaipur Sindhi Camp', time: '13:00', fareFromOrigin: 360 }
    ],
    helpline: '0124-2320222'
  },
  {
    id: 'GUR-JAI-03',
    busNumber: 'HR-55-B-1003',
    depotId: 'GURUGRAM',
    depotName: 'Gurugram',
    depotNameHi: 'गुरुग्राम',
    origin: 'Gurugram',
    destination: 'Jaipur Sindhi Camp',
    destinationHi: 'जयपुर सिंधी कैंप',
    departureTime: '13:00',
    arrivalTime: '17:30',
    fleetType: 'ORDINARY',
    fare: 260,
    routeVia: ['Dharuhera', 'Bawal', 'Kotputli', 'Shahpura'],
    intermediateStops: [
      { name: 'Kotputli', time: '15:15', fareFromOrigin: 145 },
      { name: 'Jaipur Sindhi Camp', time: '17:30', fareFromOrigin: 260 }
    ],
    helpline: '0124-2320222'
  },
  {
    id: 'GUR-JAI-04',
    busNumber: 'HR-55-B-1004',
    depotId: 'GURUGRAM',
    depotName: 'Gurugram',
    depotNameHi: 'गुरुग्राम',
    origin: 'Gurugram',
    destination: 'Jaipur Sindhi Camp',
    destinationHi: 'जयपुर सिंधी कैंप',
    departureTime: '17:30',
    arrivalTime: '22:00',
    fleetType: 'HVAC',
    fare: 360,
    routeVia: ['Dharuhera', 'Kotputli', 'Shahpura'],
    intermediateStops: [
      { name: 'Kotputli', time: '19:45', fareFromOrigin: 195 },
      { name: 'Jaipur Sindhi Camp', time: '22:00', fareFromOrigin: 360 }
    ],
    helpline: '0124-2320222'
  },

  // Rohtak to Chandigarh
  {
    id: 'ROH-CHD-01',
    busNumber: 'HR-12-D-1001',
    depotId: 'ROHTAK',
    depotName: 'Rohtak',
    depotNameHi: 'रोहतक',
    origin: 'Rohtak',
    destination: 'Chandigarh ISBT-17',
    destinationHi: 'चंडीगढ़ ISBT-17',
    departureTime: '06:15',
    arrivalTime: '11:00',
    fleetType: 'HVAC',
    fare: 310,
    routeVia: ['Gohana Sub-Depot', 'Panipat', 'Karnal', 'Ambala Cantt'],
    intermediateStops: [
      { name: 'Gohana Sub-Depot', time: '07:00', fareFromOrigin: 45 },
      { name: 'Panipat', time: '07:50', fareFromOrigin: 95 },
      { name: 'Karnal', time: '08:40', fareFromOrigin: 155 },
      { name: 'Ambala Cantt', time: '09:55', fareFromOrigin: 250 },
      { name: 'Chandigarh ISBT-17', time: '11:00', fareFromOrigin: 310 }
    ],
    helpline: '01262-276641'
  },
  {
    id: 'ROH-CHD-02',
    busNumber: 'HR-12-D-1002',
    depotId: 'ROHTAK',
    depotName: 'Rohtak',
    depotNameHi: 'रोहतक',
    origin: 'Rohtak',
    destination: 'Chandigarh ISBT-17',
    destinationHi: 'चंडीगढ़ ISBT-17',
    departureTime: '11:30',
    arrivalTime: '16:15',
    fleetType: 'ORDINARY',
    fare: 235,
    routeVia: ['Gohana Sub-Depot', 'Panipat', 'Karnal', 'Ambala Cantt'],
    intermediateStops: [
      { name: 'Panipat', time: '13:05', fareFromOrigin: 75 },
      { name: 'Ambala Cantt', time: '15:10', fareFromOrigin: 185 },
      { name: 'Chandigarh ISBT-17', time: '16:15', fareFromOrigin: 235 }
    ],
    helpline: '01262-276641'
  },
  {
    id: 'ROH-CHD-03',
    busNumber: 'HR-12-D-1003',
    depotId: 'ROHTAK',
    depotName: 'Rohtak',
    depotNameHi: 'रोहतक',
    origin: 'Rohtak',
    destination: 'Chandigarh ISBT-17',
    destinationHi: 'चंडीगढ़ ISBT-17',
    departureTime: '16:00',
    arrivalTime: '20:45',
    fleetType: 'HVAC',
    fare: 310,
    routeVia: ['Gohana Sub-Depot', 'Panipat', 'Karnal', 'Ambala Cantt'],
    intermediateStops: [
      { name: 'Panipat', time: '17:35', fareFromOrigin: 95 },
      { name: 'Ambala Cantt', time: '19:40', fareFromOrigin: 250 },
      { name: 'Chandigarh ISBT-17', time: '20:45', fareFromOrigin: 310 }
    ],
    helpline: '01262-276641'
  },

  // Karnal to Haridwar
  {
    id: 'KAR-HAR-01',
    busNumber: 'HR-45-A-1001',
    depotId: 'KARNAL',
    depotName: 'Karnal',
    depotNameHi: 'करनाल',
    origin: 'Karnal',
    destination: 'Haridwar',
    destinationHi: 'हरिद्वार',
    departureTime: '06:30',
    arrivalTime: '11:00',
    fleetType: 'ORDINARY',
    fare: 185,
    routeVia: ['Yamunanagar (Jagadhri)', 'Saharanpur', 'Roorkee'],
    intermediateStops: [
      { name: 'Yamunanagar (Jagadhri)', time: '07:45', fareFromOrigin: 65 },
      { name: 'Saharanpur', time: '08:45', fareFromOrigin: 110 },
      { name: 'Roorkee', time: '09:50', fareFromOrigin: 150 },
      { name: 'Haridwar', time: '11:00', fareFromOrigin: 185 }
    ],
    helpline: '0184-2252119'
  },
  {
    id: 'KAR-HAR-02',
    busNumber: 'HR-45-A-1002',
    depotId: 'KARNAL',
    depotName: 'Karnal',
    depotNameHi: 'करनाल',
    origin: 'Karnal',
    destination: 'Haridwar',
    destinationHi: 'हरिद्वार',
    departureTime: '13:00',
    arrivalTime: '17:30',
    fleetType: 'ORDINARY',
    fare: 185,
    routeVia: ['Yamunanagar (Jagadhri)', 'Saharanpur', 'Roorkee'],
    intermediateStops: [
      { name: 'Yamunanagar (Jagadhri)', time: '14:15', fareFromOrigin: 65 },
      { name: 'Haridwar', time: '17:30', fareFromOrigin: 185 }
    ],
    helpline: '0184-2252119'
  },

  // Rewari to Delhi
  {
    id: 'REW-DEL-01',
    busNumber: 'HR-36-C-1001',
    depotId: 'REWARI',
    depotName: 'Rewari',
    depotNameHi: 'रेवाड़ी',
    origin: 'Rewari',
    destination: 'Delhi ISBT Kashmiri Gate',
    destinationHi: 'दिल्ली कश्मीरी गेट',
    departureTime: '06:45',
    arrivalTime: '09:15',
    fleetType: 'ORDINARY',
    fare: 95,
    routeVia: ['Dharuhera', 'Manesar', 'Gurugram', 'Dhaula Kuan'],
    intermediateStops: [
      { name: 'Dharuhera', time: '07:15', fareFromOrigin: 25 },
      { name: 'Gurugram', time: '08:00', fareFromOrigin: 60 },
      { name: 'Delhi ISBT Kashmiri Gate', time: '09:15', fareFromOrigin: 95 }
    ],
    helpline: '01274-256751'
  },
  {
    id: 'REW-DEL-02',
    busNumber: 'HR-36-C-1002',
    depotId: 'REWARI',
    depotName: 'Rewari',
    depotNameHi: 'रेवाड़ी',
    origin: 'Rewari',
    destination: 'Delhi ISBT Kashmiri Gate',
    destinationHi: 'दिल्ली कश्मीरी गेट',
    departureTime: '11:00',
    arrivalTime: '13:30',
    fleetType: 'ORDINARY',
    fare: 95,
    routeVia: ['Dharuhera', 'Manesar', 'Gurugram'],
    intermediateStops: [
      { name: 'Gurugram', time: '12:15', fareFromOrigin: 60 },
      { name: 'Delhi ISBT Kashmiri Gate', time: '13:30', fareFromOrigin: 95 }
    ],
    helpline: '01274-256751'
  },
  {
    id: 'REW-DEL-03',
    busNumber: 'HR-36-C-1003',
    depotId: 'REWARI',
    depotName: 'Rewari',
    depotNameHi: 'रेवाड़ी',
    origin: 'Rewari',
    destination: 'Delhi ISBT Kashmiri Gate',
    destinationHi: 'दिल्ली कश्मीरी गेट',
    departureTime: '16:00',
    arrivalTime: '18:30',
    fleetType: 'ORDINARY',
    fare: 95,
    routeVia: ['Dharuhera', 'Gurugram'],
    intermediateStops: [
      { name: 'Gurugram', time: '17:15', fareFromOrigin: 60 },
      { name: 'Delhi ISBT Kashmiri Gate', time: '18:30', fareFromOrigin: 95 }
    ],
    helpline: '01274-256751'
  },

  // Sirsa to Delhi
  {
    id: 'SIR-DEL-01',
    busNumber: 'HR-24-A-1001',
    depotId: 'SIRSA',
    depotName: 'Sirsa',
    depotNameHi: 'सिरसा',
    origin: 'Sirsa',
    destination: 'Delhi ISBT Kashmiri Gate',
    destinationHi: 'दिल्ली कश्मीरी गेट',
    departureTime: '05:00',
    arrivalTime: '11:30',
    fleetType: 'ORDINARY',
    fare: 315,
    routeVia: ['Mandi Dabwali Sub-Depot', 'Fatehabad', 'Hisar', 'Rohtak'],
    intermediateStops: [
      { name: 'Fatehabad', time: '05:45', fareFromOrigin: 45 },
      { name: 'Hisar', time: '06:50', fareFromOrigin: 105 },
      { name: 'Rohtak', time: '09:15', fareFromOrigin: 215 },
      { name: 'Delhi ISBT Kashmiri Gate', time: '11:30', fareFromOrigin: 315 }
    ],
    helpline: '01666-220468'
  },
  {
    id: 'SIR-DEL-02',
    busNumber: 'HR-24-A-1002',
    depotId: 'SIRSA',
    depotName: 'Sirsa',
    depotNameHi: 'सिरसा',
    origin: 'Sirsa',
    destination: 'Delhi ISBT Kashmiri Gate',
    destinationHi: 'दिल्ली कश्मीरी गेट',
    departureTime: '12:00',
    arrivalTime: '18:30',
    fleetType: 'HVAC',
    fare: 420,
    routeVia: ['Fatehabad', 'Hisar', 'Rohtak'],
    intermediateStops: [
      { name: 'Hisar', time: '13:50', fareFromOrigin: 145 },
      { name: 'Delhi ISBT Kashmiri Gate', time: '18:30', fareFromOrigin: 420 }
    ],
    helpline: '01666-220468'
  },

  // Kalka Sub-Depot to Delhi
  {
    id: 'KAL-DEL-01',
    busNumber: 'HR-68-C-1001',
    depotId: 'KALKA',
    depotName: 'Kalka Sub-Depot',
    depotNameHi: 'कालका',
    origin: 'Kalka Sub-Depot',
    destination: 'Delhi ISBT Kashmiri Gate',
    destinationHi: 'दिल्ली कश्मीरी गेट',
    departureTime: '05:15',
    arrivalTime: '10:30',
    fleetType: 'HVAC',
    fare: 380,
    routeVia: ['Panchkula', 'Zirakpur', 'Ambala Cantt', 'Karnal', 'Panipat'],
    intermediateStops: [
      { name: 'Panchkula', time: '05:45', fareFromOrigin: 35 },
      { name: 'Ambala Cantt', time: '06:45', fareFromOrigin: 90 },
      { name: 'Karnal', time: '08:00', fareFromOrigin: 180 },
      { name: 'Delhi ISBT Kashmiri Gate', time: '10:30', fareFromOrigin: 380 }
    ],
    helpline: '01733-220230'
  },
  {
    id: 'KAL-DEL-02',
    busNumber: 'HR-68-C-1002',
    depotId: 'KALKA',
    depotName: 'Kalka Sub-Depot',
    depotNameHi: 'कालका',
    origin: 'Kalka Sub-Depot',
    destination: 'Delhi ISBT Kashmiri Gate',
    destinationHi: 'दिल्ली कश्मीरी गेट',
    departureTime: '14:00',
    arrivalTime: '19:15',
    fleetType: 'ORDINARY',
    fare: 295,
    routeVia: ['Panchkula', 'Ambala Cantt', 'Karnal', 'Panipat'],
    intermediateStops: [
      { name: 'Ambala Cantt', time: '15:30', fareFromOrigin: 70 },
      { name: 'Delhi ISBT Kashmiri Gate', time: '19:15', fareFromOrigin: 295 }
    ],
    helpline: '01733-220230'
  }
];

export const BUS_DATA = BUS_SERVICES;