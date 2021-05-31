$(function () {
    $(".layui-side-scroll ul li").eq(0).click(function () {
        location.href="/admin_index";
    });
    $(".layui-side-scroll ul li").eq(1).click(function () {
        location.href="/admin_ricem";
    });
    $(".layui-nav-child dd").eq(0).click(function () {
        location.href="/admin_ordering";
    });
    $(".layui-nav-child dd").eq(1).click(function () {
        location.href="/admin_ordered";
    });
    $(".layui-side-scroll ul li").eq(3).click(function () {
        location.href="/admin_deuser";
    });
})