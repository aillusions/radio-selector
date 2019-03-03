/**
 *
 */
function RadioSelector() {
    var srv = this;

    srv.selectedIdx = null;

    this.getSelectedIdx = function () {
        return srv.selectedIdx;
    };

    this.setSelectedIdx = function (idx) {
        srv.selectedIdx = idx;
    };
}
