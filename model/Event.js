import moment from 'moment';

export default function Event(plainEvent) {

    let _e;

    if ( plainEvent ) {

        //  Validate date
        if ( !moment(plainEvent.date).isValid() )
            console.error('Invalid Event date: ' + plainEvent.date);

        //  Validate startTime if present
        const startIsValid = moment(plainEvent.startTime, "HH:mm").isValid();
        if ( plainEvent.startTime && !startIsValid )
            console.error('Invalid Event start time: ' + plainEvent.startTime);

        //  Validate endTime if present
        const endIsValid = moment(plainEvent.endTime, "HH:mm").isValid();
        if ( plainEvent.endTime && !endIsValid )
            console.error('Invalid Event end time: ' + plainEvent.endTime);

        //  Validate endTime if startTime is present
        if ( startIsValid && !plainEvent.endTime )
            console.error('Events with a start time require an end time as well.');

        _e = plainEvent;

        //  Get additional event attributes
        const keys = Object.keys( plainEvent );

        //  Assign additional variables to plain object _e
        keys.map( k => {
            if ( !['date', 'startTime', 'endTime'].includes(k) ) {
                Object.defineProperty(this, k, {
                    get: () => _e[k],
                    set: (v) => _e[k] = v
                });
            }
        });
    }
    else
        _e = {
            date: new Date(),
            startTime: null,
            endTime: null
        };

    let _date = moment(_e.date);
    let _startTime = _e.startTime ? moment(_e.startTime, "HH:mm") : null;
    let _endTime = _e.endTime ? moment(_e.endTime, "HH:mm") : null;
    let _overlaps = 0;

    Object.defineProperty(this, '_e', {
        get: () => {
            return Object.assign(JSON.parse(JSON.stringify(_e)), {
                date: moment(_e.date).toDate(), //   Make sure date is correctly parsed and formatted
                startTime: _e.startTime,
                endTime: _e.endTime
            });
        }
    });

    Object.defineProperty(this, 'date', {
        enumerable: true,
        get: () => _date,
        set: (nDate) => { _date = moment(nDate); _e.date = moment(nDate).toDate() }
    });

    Object.defineProperty(this, 'startTime', {
        enumerable: true,
        get: () => _startTime,
        set: (nStartTime) => { _startTime = nStartTime; _e.startTime = nStartTime.format('HH:mm') }
    });

    Object.defineProperty(this, 'endTime', {
        enumerable: true,
        get: () => _endTime,
        set: (nEndTime) => { _endTime = nEndTime; _e.endTime = nEndTime.format('HH:mm') }
    });

    Object.defineProperty(this, 'overlaps', { get: () => _overlaps, set: (nOverlaps) => { _overlaps = nOverlaps; }});

    Object.defineProperty(this, 'bindGetter', {
        get: () => function (attr, value) {
            return Object.defineProperty(this, attr, {
                get: () => {
                    if ( typeof value === 'function') {
                        return value(this);
                    } else {
                        return _e[value];
                    }
                }
            });
        }
    })
};