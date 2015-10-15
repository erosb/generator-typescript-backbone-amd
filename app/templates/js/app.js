define(["require", "exports", "jquery", "view/UserView", "model/UserModel"], function (require, exports, $, UserView, UserModel) {
    function app() {
        $("body").append(new UserView({ model: new UserModel() }).render().$el);
    }
    return app;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC50cyJdLCJuYW1lcyI6WyJhcHAiXSwibWFwcGluZ3MiOiI7SUFJQTtRQUNDQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxRQUFRQSxDQUFDQSxFQUFDQSxLQUFLQSxFQUFHQSxJQUFJQSxTQUFTQSxFQUFFQSxFQUFDQSxDQUFDQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtJQUN4RUEsQ0FBQ0E7SUFFRCxPQUFTLEdBQUcsQ0FBQyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCA9IHJlcXVpcmUoXCJqcXVlcnlcIik7XG5pbXBvcnQgVXNlclZpZXcgPSByZXF1aXJlKFwidmlldy9Vc2VyVmlld1wiKTtcbmltcG9ydCBVc2VyTW9kZWwgPSByZXF1aXJlKFwibW9kZWwvVXNlck1vZGVsXCIpO1xuXG5mdW5jdGlvbiBhcHAoKSB7XG5cdCQoXCJib2R5XCIpLmFwcGVuZChuZXcgVXNlclZpZXcoe21vZGVsIDogbmV3IFVzZXJNb2RlbCgpfSkucmVuZGVyKCkuJGVsKTtcbn1cblxuZXhwb3J0ID0gYXBwO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
