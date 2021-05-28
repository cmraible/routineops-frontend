import { RRule } from 'rrule';
import { DateTime } from 'luxon';

export const weekdays = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
]


export const weekday_objs = [
    {
        index: 0,
        weekday: 'Monday'
    },
    {
        index: 1,
        weekday: 'Tuesday'
    },
    {
        index: 2,
        weekday: 'Wednesday'
    },
    {
        index: 3,
        weekday: 'Thursday'
    },
    {
        index: 4,
        weekday: 'Friday'
    },
    {
        index: 5,
        weekday: 'Saturday'
    },
    {
        index: 6,
        weekday: 'Sunday'
    },
]

export const formatTime = (time) => {
    const hours24 = parseInt(time.split(":")[0]);
    const minutes = time.split(":")[1];
    const meridian = hours24 > 12 ? "PM" : "AM";
    const hours = hours24 > 12 ? hours24 - 12 : hours24;
    return `${hours}:${minutes} ${meridian}`
}

export const days = [
    {
        short: 'Mon',
        label: 'Monday',
        value: RRule.MO.weekday
      },
      {
        short: 'Tue',
        label: 'Tuesday',
        value: RRule.TU.weekday
      },
      {
        short: 'Wed',
        label: 'Wednesday',
        value: RRule.WE.weekday
      },
      {
        short: 'Thu',
        label: 'Thursday',
        value: RRule.TH.weekday
      },
      {
        short: 'Fri',
        label: 'Friday',
        value: RRule.FR.weekday
      },
      {
        short: 'Sat',
        label: 'Saturday',
        value: RRule.SA.weekday
      },
      {
        short: 'Sun',
        label: 'Sunday',
        value: RRule.SU.weekday
      },
]

export const loginUser = (user) => {
    if (!window.Cypress) {
        window.analytics.identify(user.id, {
            'firstName': user.first_name,
            'lastName': user.last_name,
            'name': user.first_name + ' ' + user.last_name,
            'email': user.email,
            'phone': user.phone,
            'invitation': user.invitation,
            'is_account_owner': user.is_account_owner,
            'is_account_admin': user.is_account_admin,
            'is_active': user.is_active,
            'createdAt': user.date_joined,
            'last_login': user.last_login,
            'is_staff': user.is_staff,
            'is_superuser': user.is_superuser,
            'onboardComplete': user.onboard_complete,
            'organization_id': user.account,
            'company': {
                'id': user.account,
                'organization_id': user.account
            }
            }, {
            Intercom: {
                user_hash: user.intercom_hash
            }
            });
            window.analytics.group(user.account, {
                id: user.account,
                organization_id: user.account
            })
        window.analytics.track('Logged in.')
    }
}

export const flattenErrors = (errors) => {
    let result = {}
    for (const [key, value] of Object.entries(errors)) {
        // Loop over keys in object
        // If a value is an array, loop over and join it.
        const newKey = (key === 'detail') ? 'non_field_errors': key;
        if (Array.isArray(value)) {
            if (value.length === 1) {
                result[newKey] = value[0]
            } else {
                result[newKey] = value.join(', ')
            }
        } else {
            result[newKey] = value
        }
    }
    return result
}

export const formatHour = (hour) => {
    if (hour > 11) {
        return `${((hour - 12) === 0) ? '12' : (hour-12)}:00 pm`
    } else {
        return `${((hour) === 0) ? '12' : (hour)}:00 am`
    }
}



export const ordinal_suffix_of = (i) => {
    var j = i % 10,
        k = i % 100;
    if (j === 1 && k !== 11) {
        return i + "st";
    }
    if (j === 2 && k !== 12) {
        return i + "nd";
    }
    if (j === 3 && k !== 13) {
        return i + "rd";
    }
    return i + "th";
}

export const formatMonthDay = (i) => {
    const num = parseInt(i)
    if (num === 1) {
        return 'First'
    }
    if (num === -1) {
        return 'Last'
    }
    return ordinal_suffix_of(num);
}

export const defaultLayerParams = (label, account) => {
    const byweekday = account.working_days.slice().sort((a, b) => a-b) || [0,1,2,3,4,5,6]
    const byhour = account.working_hours || [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
    const tz = DateTime.local().zoneName
    switch (label) {
        case 'Hourly':
            return {
                freq: RRule.HOURLY,
                interval: 1,
                dtstart: DateTime.local().startOf('hour').setZone('utc', { keepLocalTime: true}).toJSDate(),
                byweekday: byweekday,
                byhour: byhour,
                tzid: tz
            }
        case 'Daily':
            return {
                freq: RRule.DAILY,
                interval: 1,
                dtstart: DateTime.local().endOf('day').setZone('utc', { keepLocalTime: true }).toJSDate(),
                byweekday: byweekday,
                tzid: tz,
            }
        case 'Weekly':
            return {
                freq: RRule.WEEKLY,
                interval: 1,
                dtstart: DateTime.local().endOf('day').setZone('utc', { keepLocalTime: true}).toJSDate(),
                tzid: tz,
                byweekday: [byweekday[byweekday.length - 1]],
                wkst: account.wkst
            }
        case 'Bi-Weekly':
            return {
                freq: RRule.WEEKLY,
                interval: 2,
                dtstart: DateTime.local().endOf('day').setZone('utc', {keepLocalTime: true}).toJSDate(),
                tzid: tz,
                byweekday: [byweekday[byweekday.length - 1]],
                wkst: account.wkst
            }
        case 'Monthly':
            return {
                freq: RRule.MONTHLY,
                interval: 1,
                dtstart: DateTime.local().endOf('day').setZone('utc', { keepLocalTime: true}).toJSDate(),
                tzid: tz,
                bymonthday: [-1],
                bymonth: [1,2,3,4,5,6,7,8,9,10,11,12]
            }
        case 'Yearly':
            return {
                freq: RRule.YEARLY,
                interval: 1,
                dtstart: DateTime.local().endOf('day').setZone('utc', { keepLocalTime: true}).toJSDate(),
                tzid: tz,
                bymonthday: [-1],
                bymonth: [12]
            }
        default:
            return null
    }
}


export const timezones = [
    'US/Alaska',
    'US/Arizona',
    'US/Central',
    'US/Eastern',
    'US/Hawaii',
    'US/Mountain',
    'US/Pacific',
    'Africa/Abidjan',
    'Africa/Accra',
    'Africa/Addis_Ababa',
    'Africa/Algiers',
    'Africa/Asmara',
    'Africa/Bamako',
    'Africa/Bangui',
    'Africa/Banjul',
    'Africa/Bissau',
    'Africa/Blantyre',
    'Africa/Brazzaville',
    'Africa/Bujumbura',
    'Africa/Cairo',
    'Africa/Casablanca',
    'Africa/Ceuta',
    'Africa/Conakry',
    'Africa/Dakar',
    'Africa/Dar_es_Salaam',
    'Africa/Djibouti',
    'Africa/Douala',
    'Africa/El_Aaiun',
    'Africa/Freetown',
    'Africa/Gaborone',
    'Africa/Harare',
    'Africa/Johannesburg',
    'Africa/Juba',
    'Africa/Kampala',
    'Africa/Khartoum',
    'Africa/Kigali',
    'Africa/Kinshasa',
    'Africa/Lagos',
    'Africa/Libreville',
    'Africa/Lome',
    'Africa/Luanda',
    'Africa/Lubumbashi',
    'Africa/Lusaka',
    'Africa/Malabo',
    'Africa/Maputo',
    'Africa/Maseru',
    'Africa/Mbabane',
    'Africa/Mogadishu',
    'Africa/Monrovia',
    'Africa/Nairobi',
    'Africa/Ndjamena',
    'Africa/Niamey',
    'Africa/Nouakchott',
    'Africa/Ouagadougou',
    'Africa/Porto-Novo',
    'Africa/Sao_Tome',
    'Africa/Tripoli',
    'Africa/Tunis',
    'Africa/Windhoek',
    'America/Adak',
    'America/Anchorage',
    'America/Anguilla',
    'America/Antigua',
    'America/Araguaina',
    'America/Argentina/Buenos_Aires',
    'America/Argentina/Catamarca',
    'America/Argentina/Cordoba',
    'America/Argentina/Jujuy',
    'America/Argentina/La_Rioja',
    'America/Argentina/Mendoza',
    'America/Argentina/Rio_Gallegos',
    'America/Argentina/Salta',
    'America/Argentina/San_Juan',
    'America/Argentina/San_Luis',
    'America/Argentina/Tucuman',
    'America/Argentina/Ushuaia',
    'America/Aruba',
    'America/Asuncion',
    'America/Atikokan',
    'America/Bahia',
    'America/Bahia_Banderas',
    'America/Barbados',
    'America/Belem',
    'America/Belize',
    'America/Blanc-Sablon',
    'America/Boa_Vista',
    'America/Bogota',
    'America/Boise',
    'America/Cambridge_Bay',
    'America/Campo_Grande',
    'America/Cancun',
    'America/Caracas',
    'America/Cayenne',
    'America/Cayman',
    'America/Chicago',
    'America/Chihuahua',
    'America/Costa_Rica',
    'America/Creston',
    'America/Cuiaba',
    'America/Curacao',
    'America/Danmarkshavn',
    'America/Dawson',
    'America/Dawson_Creek',
    'America/Denver',
    'America/Detroit',
    'America/Dominica',
    'America/Edmonton',
    'America/Eirunepe',
    'America/El_Salvador',
    'America/Fort_Nelson',
    'America/Fortaleza',
    'America/Glace_Bay',
    'America/Goose_Bay',
    'America/Grand_Turk',
    'America/Grenada',
    'America/Guadeloupe',
    'America/Guatemala',
    'America/Guayaquil',
    'America/Guyana',
    'America/Halifax',
    'America/Havana',
    'America/Hermosillo',
    'America/Indiana/Indianapolis',
    'America/Indiana/Knox',
    'America/Indiana/Marengo',
    'America/Indiana/Petersburg',
    'America/Indiana/Tell_City',
    'America/Indiana/Vevay',
    'America/Indiana/Vincennes',
    'America/Indiana/Winamac',
    'America/Inuvik',
    'America/Iqaluit',
    'America/Jamaica',
    'America/Juneau',
    'America/Kentucky/Louisville',
    'America/Kentucky/Monticello',
    'America/Kralendijk',
    'America/La_Paz',
    'America/Lima',
    'America/Los_Angeles',
    'America/Lower_Princes',
    'America/Maceio',
    'America/Managua',
    'America/Manaus',
    'America/Marigot',
    'America/Martinique',
    'America/Matamoros',
    'America/Mazatlan',
    'America/Menominee',
    'America/Merida',
    'America/Metlakatla',
    'America/Mexico_City',
    'America/Miquelon',
    'America/Moncton',
    'America/Monterrey',
    'America/Montevideo',
    'America/Montserrat',
    'America/Nassau',
    'America/New_York',
    'America/Nipigon',
    'America/Nome',
    'America/Noronha',
    'America/North_Dakota/Beulah',
    'America/North_Dakota/Center',
    'America/North_Dakota/New_Salem',
    'America/Nuuk',
    'America/Ojinaga',
    'America/Panama',
    'America/Pangnirtung',
    'America/Paramaribo',
    'America/Phoenix',
    'America/Port-au-Prince',
    'America/Port_of_Spain',
    'America/Porto_Velho',
    'America/Puerto_Rico',
    'America/Punta_Arenas',
    'America/Rainy_River',
    'America/Rankin_Inlet',
    'America/Recife',
    'America/Regina',
    'America/Resolute',
    'America/Rio_Branco',
    'America/Santarem',
    'America/Santiago',
    'America/Santo_Domingo',
    'America/Sao_Paulo',
    'America/Scoresbysund',
    'America/Sitka',
    'America/St_Barthelemy',
    'America/St_Johns',
    'America/St_Kitts',
    'America/St_Lucia',
    'America/St_Thomas',
    'America/St_Vincent',
    'America/Swift_Current',
    'America/Tegucigalpa',
    'America/Thule',
    'America/Thunder_Bay',
    'America/Tijuana',
    'America/Toronto',
    'America/Tortola',
    'America/Vancouver',
    'America/Whitehorse',
    'America/Winnipeg',
    'America/Yakutat',
    'America/Yellowknife',
    'Antarctica/Casey',
    'Antarctica/Davis',
    'Antarctica/DumontDUrville',
    'Antarctica/Macquarie',
    'Antarctica/Mawson',
    'Antarctica/McMurdo',
    'Antarctica/Palmer',
    'Antarctica/Rothera',
    'Antarctica/Syowa',
    'Antarctica/Troll',
    'Antarctica/Vostok',
    'Arctic/Longyearbyen',
    'Asia/Aden',
    'Asia/Almaty',
    'Asia/Amman',
    'Asia/Anadyr',
    'Asia/Aqtau',
    'Asia/Aqtobe',
    'Asia/Ashgabat',
    'Asia/Atyrau',
    'Asia/Baghdad',
    'Asia/Bahrain',
    'Asia/Baku',
    'Asia/Bangkok',
    'Asia/Barnaul',
    'Asia/Beirut',
    'Asia/Bishkek',
    'Asia/Brunei',
    'Asia/Chita',
    'Asia/Choibalsan',
    'Asia/Colombo',
    'Asia/Damascus',
    'Asia/Dhaka',
    'Asia/Dili',
    'Asia/Dubai',
    'Asia/Dushanbe',
    'Asia/Famagusta',
    'Asia/Gaza',
    'Asia/Hebron',
    'Asia/Ho_Chi_Minh',
    'Asia/Hong_Kong',
    'Asia/Hovd',
    'Asia/Irkutsk',
    'Asia/Jakarta',
    'Asia/Jayapura',
    'Asia/Jerusalem',
    'Asia/Kabul',
    'Asia/Kamchatka',
    'Asia/Karachi',
    'Asia/Kathmandu',
    'Asia/Khandyga',
    'Asia/Kolkata',
    'Asia/Krasnoyarsk',
    'Asia/Kuala_Lumpur',
    'Asia/Kuching',
    'Asia/Kuwait',
    'Asia/Macau',
    'Asia/Magadan',
    'Asia/Makassar',
    'Asia/Manila',
    'Asia/Muscat',
    'Asia/Nicosia',
    'Asia/Novokuznetsk',
    'Asia/Novosibirsk',
    'Asia/Omsk',
    'Asia/Oral',
    'Asia/Phnom_Penh',
    'Asia/Pontianak',
    'Asia/Pyongyang',
    'Asia/Qatar',
    'Asia/Qostanay',
    'Asia/Qyzylorda',
    'Asia/Riyadh',
    'Asia/Sakhalin',
    'Asia/Samarkand',
    'Asia/Seoul',
    'Asia/Shanghai',
    'Asia/Singapore',
    'Asia/Srednekolymsk',
    'Asia/Taipei',
    'Asia/Tashkent',
    'Asia/Tbilisi',
    'Asia/Tehran',
    'Asia/Thimphu',
    'Asia/Tokyo',
    'Asia/Tomsk',
    'Asia/Ulaanbaatar',
    'Asia/Urumqi',
    'Asia/Ust-Nera',
    'Asia/Vientiane',
    'Asia/Vladivostok',
    'Asia/Yakutsk',
    'Asia/Yangon',
    'Asia/Yekaterinburg',
    'Asia/Yerevan',
    'Atlantic/Azores',
    'Atlantic/Bermuda',
    'Atlantic/Canary',
    'Atlantic/Cape_Verde',
    'Atlantic/Faroe',
    'Atlantic/Madeira',
    'Atlantic/Reykjavik',
    'Atlantic/South_Georgia',
    'Atlantic/St_Helena',
    'Atlantic/Stanley',
    'Australia/Adelaide',
    'Australia/Brisbane',
    'Australia/Broken_Hill',
    'Australia/Currie',
    'Australia/Darwin',
    'Australia/Eucla',
    'Australia/Hobart',
    'Australia/Lindeman',
    'Australia/Lord_Howe',
    'Australia/Melbourne',
    'Australia/Perth',
    'Australia/Sydney',
    'Canada/Atlantic',
    'Canada/Central',
    'Canada/Eastern',
    'Canada/Mountain',
    'Canada/Newfoundland',
    'Canada/Pacific',
    'Europe/Amsterdam',
    'Europe/Andorra',
    'Europe/Astrakhan',
    'Europe/Athens',
    'Europe/Belgrade',
    'Europe/Berlin',
    'Europe/Bratislava',
    'Europe/Brussels',
    'Europe/Bucharest',
    'Europe/Budapest',
    'Europe/Busingen',
    'Europe/Chisinau',
    'Europe/Copenhagen',
    'Europe/Dublin',
    'Europe/Gibraltar',
    'Europe/Guernsey',
    'Europe/Helsinki',
    'Europe/Isle_of_Man',
    'Europe/Istanbul',
    'Europe/Jersey',
    'Europe/Kaliningrad',
    'Europe/Kiev',
    'Europe/Kirov',
    'Europe/Lisbon',
    'Europe/Ljubljana',
    'Europe/London',
    'Europe/Luxembourg',
    'Europe/Madrid',
    'Europe/Malta',
    'Europe/Mariehamn',
    'Europe/Minsk',
    'Europe/Monaco',
    'Europe/Moscow',
    'Europe/Oslo',
    'Europe/Paris',
    'Europe/Podgorica',
    'Europe/Prague',
    'Europe/Riga',
    'Europe/Rome',
    'Europe/Samara',
    'Europe/San_Marino',
    'Europe/Sarajevo',
    'Europe/Saratov',
    'Europe/Simferopol',
    'Europe/Skopje',
    'Europe/Sofia',
    'Europe/Stockholm',
    'Europe/Tallinn',
    'Europe/Tirane',
    'Europe/Ulyanovsk',
    'Europe/Uzhgorod',
    'Europe/Vaduz',
    'Europe/Vatican',
    'Europe/Vienna',
    'Europe/Vilnius',
    'Europe/Volgograd',
    'Europe/Warsaw',
    'Europe/Zagreb',
    'Europe/Zaporozhye',
    'Europe/Zurich',
    'GMT',
    'Indian/Antananarivo',
    'Indian/Chagos',
    'Indian/Christmas',
    'Indian/Cocos',
    'Indian/Comoro',
    'Indian/Kerguelen',
    'Indian/Mahe',
    'Indian/Maldives',
    'Indian/Mauritius',
    'Indian/Mayotte',
    'Indian/Reunion',
    'Pacific/Apia',
    'Pacific/Auckland',
    'Pacific/Bougainville',
    'Pacific/Chatham',
    'Pacific/Chuuk',
    'Pacific/Easter',
    'Pacific/Efate',
    'Pacific/Enderbury',
    'Pacific/Fakaofo',
    'Pacific/Fiji',
    'Pacific/Funafuti',
    'Pacific/Galapagos',
    'Pacific/Gambier',
    'Pacific/Guadalcanal',
    'Pacific/Guam',
    'Pacific/Honolulu',
    'Pacific/Kiritimati',
    'Pacific/Kosrae',
    'Pacific/Kwajalein',
    'Pacific/Majuro',
    'Pacific/Marquesas',
    'Pacific/Midway',
    'Pacific/Nauru',
    'Pacific/Niue',
    'Pacific/Norfolk',
    'Pacific/Noumea',
    'Pacific/Pago_Pago',
    'Pacific/Palau',
    'Pacific/Pitcairn',
    'Pacific/Pohnpei',
    'Pacific/Port_Moresby',
    'Pacific/Rarotonga',
    'Pacific/Saipan',
    'Pacific/Tahiti',
    'Pacific/Tarawa',
    'Pacific/Tongatapu',
    'Pacific/Wake',
    'Pacific/Wallis',
    'UTC'
]