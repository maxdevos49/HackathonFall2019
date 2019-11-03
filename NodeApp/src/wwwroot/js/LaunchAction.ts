function InitLaunchAction() :void
{
    let elements : any = document.querySelectorAll("div[data-ui-launch]");

    elements.forEach((element: any) => {
        element.addEventListener("click", (e :any) => {

            var win:any = window;

            win[e.target.dataset.uiLaunch]();
        });
    });
}