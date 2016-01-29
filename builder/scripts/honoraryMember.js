/*******************************************************/
/* Scripts related to the ability 'Honorary Member'    */
/* When a Leader is selected, this option is displayed */
/*******************************************************/

/**
 * Check the state of the "Honorary Member" ability
 */
function check_honorary_member()
{
  var displayed = false;
  var disabled = false;
  var active = $('#honorary-member').hasClass('honorary-member-active');
  for (var iSel = 0; iSel < window.selected_supremes_list.length; iSel++)
  {
    if ((window.selected_supremes_list[iSel].role_key == "leader")
        || isInTable(window.selected_supremes_list[iSel].other_roles, 'leader'))
    {
      displayed = true;
    }
    if (window.selected_supremes_list[iSel].is_honorary_member)
    {
      disabled = true;
    }
  }

  // Toggle button is displayed if there is a Leader in the selected list
  if (displayed)
    $('#honorary-member').show();
  else
    $('#honorary-member').hide();


  // Clear specific classes
  $('#honorary-member').removeClass('honorary-member-activable honorary-member-active honorary-member-disabled');

  // If there is already an Honorary Member, click is not enabled, the star is empty, the color changes
  if (disabled)
  {
    $('#honorary-member').addClass('honorary-member-disabled');
  }
  else if (displayed && active)
  {
    $('#honorary-member').addClass('honorary-member-active');
  }
  else
  {
    $('#honorary-member').addClass('honorary-member-activable');
  }
  set_honorary_member_details(displayed, disabled, active);

  setPopupsHonoraryMember();
}

function isSelectedAsHonoraryMember(supremeSelected)
{
  if (!$('#honorary-member').hasClass('honorary-member-active'))
    return;

  // Leader factions
  var leaderFactions = get_selectedLeader_faction();
  if (leaderFactions === null)
    return false;

  // Leader with no factions, Supreme with no faction or Freelancer : Not an Honorary Member
  if ((leaderFactions.length == 0) && ((supremeSelected.factions.length == 0) || supremeSelected.is_freelance))
    return false;
  // Faction of the leader is found within the Supreme Factions : Not an Honorary Member
  var factionFound = false;
  for (var iFaction = 0; iFaction < leaderFactions.length; iFaction++)
  {
    if (isInTable(supremeSelected.factions, leaderFactions[iFaction]))
      factionFound = true;
  }
  if (factionFound)
    return false;

  // The Supreme is an Honorary Member
  return true;
}

function change_honorary_member()
{
  var displayed = false;
  var disabled = false;
  var active = false;
  // Nothing to do when disabled
  if ($('#honorary-member').hasClass('honorary-member-disabled'))
  {
    displayed = true;
    disabled = true;
    return;
  }

  if ($('#honorary-member').hasClass('honorary-member-activable'))
  {
    $('#honorary-member').removeClass('honorary-member-activable');
    $('#honorary-member').addClass('honorary-member-active');
    filter_supremes();

    displayed = true;
    active = true;
  }
  else if ($('#honorary-member').hasClass('honorary-member-active'))
  {
    $('#honorary-member').removeClass('honorary-member-active');
    $('#honorary-member').addClass('honorary-member-activable');
    filter_supremes();

    displayed = true;
  }
  setPopupsHonoraryMember();
  set_honorary_member_details(displayed, disabled, active);
}

/**
 * Set the "Details" text of the "Honorary Member" button
 * @param {Boolean} isDisplayed [Is the "Honorary Member" button displayed ?]
 * @param {Boolean} isDisabled  [Is the "Honorary Member" button disabled ? (means an Honorary Member has been selected)]
 * @param {Boolean} isActive    [Is the "Honorary Member" button active ? (means the possible Honorary Members are displayed)]
 */
function set_honorary_member_details(isDisplayed, isDisabled, isActive)
{
  var detailHonorary = '';
  if (isDisabled)
  {
    detailHonorary = 'Honorary Member selected';
    var honorarySupreme = get_honorary_member();
    if (honorarySupreme)
    {
      detailHonorary = honorarySupreme.name + ' is Honorary&nbsp;Member';
    }
  }
  else if (isDisplayed && isActive)
  {
    detailHonorary = 'Choose your Honorary Member';
  }
  else
  {
    detailHonorary = 'Click to activate';
  }
  $('#honorary-member-detail').html(detailHonorary);
}

/**
 * Get the Honorary Member in the Supremes List
 * @return {json} The current Honorary member, or Null if there isn't one
 */
function get_honorary_member()
{
  var honorarySupreme = null;
  for (var iSel = 0; iSel < window.selected_supremes_list.length; iSel++)
  {
    if (window.selected_supremes_list[iSel].is_honorary_member)
    {
      honorarySupreme = window.selected_supremes_list[iSel];
    }
  }

  return honorarySupreme;
}
