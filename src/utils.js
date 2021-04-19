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

export const getDefaultTaskLayer = (label, account) => {
    const tz = DateTime.local().zoneName
    const byweekday = account.working_days || [0,1,2,3,4,5,6]
    const byhour = account.working_hours || [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
    let rule
    switch ( label ) {
        case 'Hourly':
            const hourStart = DateTime.local().setZone('utc', { keepLocalTime: true }).startOf('hour').toJSDate()
            rule = new RRule({
                freq: RRule.HOURLY,
                interval: 1,
                dtstart: hourStart,
                byweekday: byweekday,
                byhour: byhour,
                tzid: tz
              })
            return {
                    label: 'Hourly',
                    account: account.id,
                    frequency: RRule.HOURLY,
                    interval: 1,
                    recurrence: rule.toString(),
                    dtstart: hourStart,
                    byhour: byhour,
                    byweekday: byweekday,
                    tzid: tz
            }
        case 'Daily':
            const dailydtstart = DateTime.local().setZone('utc', { keepLocalTime: true }).endOf('day').toJSDate()
            rule = new RRule({
                freq: RRule.DAILY,
                interval: 1,
                dtstart: dailydtstart,
                tzid: tz,
                byweekday: byweekday
            })
            return {
                label: 'Daily',
                account: account.id,
                frequency: RRule.DAILY,
                interval: 1,
                recurrence: rule.toString(),
                dtstart: dailydtstart,
                byweekday: byweekday,
                time: '11:59 PM',
                tzid: tz
            }
        case 'Weekly':
            const weeklydtstart = DateTime.local().setZone('utc', { keepLocalTime: true }).startOf('week').toJSDate();
            rule = new RRule({
                freq: RRule.WEEKLY,
                interval: 1,
                dtstart: weeklydtstart,
                tzid: tz,
                byweekday: byweekday
            })
            return {
                label: 'Weekly',
                account: account.id,
                frequency: RRule.WEEKLY,
                interval: 1,
                recurrence: rule.toString(),
                dtstart: weeklydtstart,
                byweekday: byweekday,
                tzid: tz
            };
        case 'Bi-Weekly':
            const biweeklydtstart = DateTime.local().setZone('utc', { keepLocalTime: true }).startOf('week').toJSDate() ;
            rule = new RRule({
                freq: RRule.WEEKLY,
                interval: 2,
                dtstart: biweeklydtstart,
                tzid: tz,
                byweekday: byweekday
            })
            return {
                label: 'Bi-Weekly',
                account: account.id,
                frequency: RRule.WEEKLY,
                interval: 2,
                recurrence: rule.toString(),
                dtstart: biweeklydtstart,
                byweekday: byweekday,
                tzid: tz
            }
        case 'Monthly':
            const monthlydtstart = DateTime.local().setZone('utc', { keepLocalTime: true }).endOf('day').toJSDate();
            rule = new RRule({
                freq: RRule.MONTHLY,
                interval: 1,
                dtstart: monthlydtstart,
                tzid: tz,
                bymonthday: [-1],
                bymonth: [1,2,3,4,5,6,7,8,9,10,11,12]
            })
            return {
                label: 'Monthly',
                account: account.id,
                frequency: RRule.MONTHLY,
                interval: 1,
                recurrence: rule.toString(),
                dtstart: monthlydtstart,
                bymonth: [1,2,3,4,5,6,7,8,9,10,11,12],
                bymonthday: [-1],
            }
        case 'Yearly':
            const yearlydtstart = DateTime.local().setZone('utc', { keepLocalTime: true }).endOf('day').toJSDate();
            rule = new RRule({
                freq: RRule.MONTHLY,
                interval: 3,
                dtstart: yearlydtstart,
                tzid: tz
            })
            return {
                label: 'Yearly',
                account: account.id,
                frequency: RRule.MONTHLY,
                interval: 3,
                recurrence: rule.toString(),
                dtstart: yearlydtstart,
                tzid: tz
            };
        default:
            return false
    }
}