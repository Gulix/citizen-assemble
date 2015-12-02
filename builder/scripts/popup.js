/* Scripts that initiliaze elements of the UI with Pop-Ups 
   The setPopups() function is called on the main page, and should include the other functions */
   
function setPopups()
{
    setPopupsElements();
}

/****************/
/*** Elements ***/
/****************/
function setPopupsElements()
{
    var popupOptions = { trigger: "hover", placement: "top", html: true };
    // Element air    
    popupOptions['title'] = "Air element";
    popupOptions['content'] = "Strong/<b>Water</b> & Strong/<b>Flight</b><br /><i>Earth is Strong/Air</i>";
    $('.icon-element-air').popover(popupOptions);
    // Element water
    popupOptions['title'] = "Water element";
    popupOptions['content'] = "Strong/<b>Fire</b> & Strong/<b>Mechanical</b><br /><i>Air is Strong/Water</i>";
    $('.icon-element-water').popover(popupOptions);
    // Element fire
    popupOptions['title'] = "Fire element";
    popupOptions['content'] = "Strong/<b>Earth</b> & Strong/<b>Non-living</b><br /><i>Water is Strong/Fire</i>";
    $('.icon-element-fire').popover(popupOptions);
    // Element earth
    popupOptions['title'] = "Earth element";
    popupOptions['content'] = "Strong/<b>Air</b> & Strong/<b>Objects and Structures</b><br /><i>Fire is Strong/Earth</i>";
    $('.icon-element-earth').popover(popupOptions);
    // Element light
    popupOptions['title'] = "Light element";
    popupOptions['content'] = "Strong/<b>Darkness</b> & Strong/<b>Outsider</b><br /><i>Darkness is Strong/Light</i>";
    $('.icon-element-light').popover(popupOptions);
    // Element darkness
    popupOptions['title'] = "Darkness element";
    popupOptions['content'] = "Strong/<b>Light</b> & Strong/<b>Living</b><br /><i>Light is Strong/Darkness</i>";
    $('.icon-element-darkness').popover(popupOptions);
}

/***********************/
/*** Honorary Member ***/
/***********************/
function setPopupsHonoraryMember()
{
    var popupOptions = { trigger: "hover", placement: "right", html: true };
    popupOptions['title'] = "Honorary Member";
    
    if ($('#honorary-member').hasClass('honorary-member-active'))
    {
        popupOptions['content'] = "Choose an Honorary Member to join your Team.<br />"
            + "This new member will have the same faction as your Leader.<br />"
            + "<i>Click to dismiss the Honorary Member option.";
    }
    else if ($('#honorary-member').hasClass('honorary-member-activable'))
    {
        popupOptions['content'] = "Click to activate the choice of an Honorary Member.<br />"
            + "This new member will have the same faction as your Leader.<br />";
    }
    else if ($('#honorary-member').hasClass('honorary-member-disabled'))
    {
        popupOptions['content'] = "The Honorary Member of your team as been selected.<br />"
            + "That Supreme is marked with a Star.<br />";
    }
    
    var popover = $('#honorary-member').data('bs.popover');
    if (popover)
    {
        popover.options.content = popupOptions.content;
    }
    else 
    {
        $('#honorary-member').popover(popupOptions);
    }
}