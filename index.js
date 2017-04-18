class HeartBeat {
    constructor(beatsPerS, debug = false) {
        this.intervalTime = Number.isFinite(beatsPerS) ? (beatsPerS * 1000) : 5000;
        this.debug = debug;

        this.shouldCallCallback = true;

        this.lastBeat = 0;
        this.intervalId = 0;
    }

    beat(onBeat = () => {}) {
        if (this.intervalId) {
            if (this.debug) { console.log('Removing previous interval'); }
            clearInterval(this.intervalId);
        }

        // Interval starts firing at the end of the interval, so previous beat would have been now
        this.lastBeat = Date.now();

        this.intervalId = setInterval(() => {
            const now = Date.now();
            const timeSinceLastBeat = now - this.lastBeat;

            this.lastBeat = now;

            if (this.shouldCallCallback) {
                onBeat(timeSinceLastBeat);
            }
        }, this.intervalTime);
    }

    mute() {
        this.shouldCallCallback = false;
    }

    unmute() {
        this.shouldCallCallback = true;
    }

    kill() {
        clearInterval(this.intervalId);
    }
}

export default HeartBeat;

