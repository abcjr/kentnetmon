var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Job = new Schema({
    schedule: String,
    type: String,
    agentID: {
        type: Schema.Types.ObjectId,
        ref: 'agents'
    }
});

var Agent = new Schema({
    ipAddr: String,
    name: String,
    location: String,
    results: [{
        type: Schema.Types.ObjectId,
        ref: 'results'
    }],
    resultsudp: [{
        type: Schema.Types.ObjectId,
        ref: 'resultsudp'
    }],
    jobs: [{
        type: Schema.Types.ObjectId,
        ref: 'jobs'
    }],
    ping: [{
        type: Schema.Types.ObjectId,
        ref: 'pings'
    }]
});

var Ping = new Schema({
    time: Number
});

var Result = new Schema({
    start: {
        connected: [{
            socket: Number,
            local_host: String,
            local_port: Number,
            remote_host: String,
            remote_port: Number
        }],
        version: String,
        system_info: String,
        timestamp: {
            time: Date,
            timesecs: Number
        },
        connecting_to: {
            host: String,
            port: Number
        },
        cookie: String,
        tcp_mss_default: Number,
        test_start: {
            protocol: String,
            num_streams: Number,
            blksize: Number,
            omit: Number,
            duration: Number,
            bytes: Number,
            blocks: Number,
            reverse: Number
        }
    },
    intervals: [{
        streams: [{
            socket: Number,
            start: Number,
            end: Number,
            seconds: Number,
            bytes: Number,
            bits_per_second: Number,
            omitted: Boolean
        }],
        sum: {
            start: Number,
            end: Number,
            seconds: Number,
            bytes: Number,
            bits_per_second: Number,
            omitted: Boolean
        }
    }],
    end: {
        streams: [{
            sender: {
                socket: Number,
                start: Number,
                end: Number,
                seconds: Number,
                bytes: Number,
                bits_per_second: Number
            },
            receiver: {
                socket: Number,
                start: Number,
                end: Number,
                seconds: Number,
                bytes: Number,
                bits_per_second: Number
            }
        }],
        sum_sent: {
            start: Number,
            end: Number,
            seconds: Number,
            bytes: Number,
            bits_per_second: Number
        },
        sum_received: {
            start: Number,
            end: Number,
            seconds: Number,
            bytes: Number,
            bits_per_second: Number
        },
        cpu_utilization_percent: {
            host_total: Number,
            host_user: Number,
            host_system: Number,
            remote_total: Number,
            remote_user: Number,
            remote_system: Number,
        }
    }
});

var ResultUDP = new Schema({
    start: {
        connected: [{
            socket: Number,
            local_host: String,
            local_port: Number,
            remote_host: String,
            remote_port: Number
        }],
        version: String,
        system_info: String,
        timestamp: {
            time: Date,
            timesecs: Number
        },
        connecting_to: {
            host: String,
            port: Number
        },
        cookie: String,
        tcp_mss_default: Number,
        test_start: {
            protocol: String,
            num_streams: Number,
            blksize: Number,
            omit: Number,
            duration: Number,
            bytes: Number,
            blocks: Number,
            reverse: Number
        }
    },
    intervals: [{
        streams: [{
            socket: Number,
            start: Number,
            end: Number,
            seconds: Number,
            bytes: Number,
            bits_per_second: Number,
            packets: Number,
            omitted: Boolean
        }],
        sum: {
            start: Number,
            end: Number,
            seconds: Number,
            bytes: Number,
            bits_per_second: Number,
            packets: Number,
            omitted: Boolean
        }
    }],
    end: {
        streams: [{
            udp: {
                socket: Number,
                start: Number,
                end: Number,
                seconds: Number,
                bytes: Number,
                bits_per_second: Number,
                jitter_ms: Number,
                lost_packets: Number,
                packets: Number,
                lost_percent: Number,
                out_of_order: Number
            }
        }],
        sum: {
            start: Number,
            end: Number,
            seconds: Number,
            bytes: Number,
            bits_per_second: Number,
            jitter_ms: Number,
            lost_packets: Number,
            packets: Number,
            lost_percent: Number
        },
        cpu_utilization_percent: {
            host_total: Number,
            host_user: Number,
            host_system: Number,
            remote_total: Number,
            remote_user: Number,
            remote_system: Number,
        }
    }
});


mongoose.model('agents', Agent);
mongoose.model('results', Result);
mongoose.model('resultsudp', ResultUDP);
mongoose.model('jobs', Job);
mongoose.model('pings', Ping);

if (process.env.NODE_ENV === 'develop') {
    mongoose.connect('mongodb://localhost/kentnetmon');
} else {
    mongoose.connect('mongodb://USERNAME:PASSWORD@localhost/DATABASENAME'); // <------ EDIT THIS LINE --------
}
