const Discord = require('discord.js');
const botconfig = require("./botconfig.json"); 
const bot = new Discord.Client();
const BOT_TOKEN = 'NTQ4ODM0NzA5MTg3MDY3OTA0.D1LWVg.iezjm6_eB00BbZy7It8VAE7JAXw';


//When a User Joins The Server
bot.on('guildMemberAdd', member => {
 const Welcomechannel =  member.guild.channels.find("id" , "538873204693794847");
 if(!Welcomechannel) return
 else {
  
  let WelcomeEmbed = new Discord.RichEmbed()
  .setTitle("**Welcome to Leaguehalla !**")
  .setAuthor(`Welcome ${member.displayName}`, member.guild.iconURL)
  .setColor(0x581845)
  .setDescription("Welcome to the Leaguehalla Community ! make sure to read the #📜-rules  and have fun ! ")
  .setThumbnail(member.guild.iconURL)
  .setTimestamp()
  .setFooter('LH Bot created by Swo0p#0034', bot.user.displayAvatarURL)

  Welcomechannel.send(WelcomeEmbed);
 }
 
});


//When Generally The Bot Becomes Online
bot.on('ready' , () =>{

    console.log('The Bot Is Alive!');
    bot.user.setStatus("online");
    bot.user.setActivity('-help', {type: "PLAYING"});


    
})



bot.on('message' , async message=>{

if(message.author.bot) return;
if(message.channel.type === "dm") return message.channel.send("Stop it. get some help");
const PREFIX = botconfig.Prefix;
if(!message.content.startsWith(PREFIX)) return;




let args = message.content.substring(PREFIX.length).split(" ");




 switch(args[0]){
        case 'purge':
        if(!args[1]) return message.reply('Specify a number of messages to delete');
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply('Only Masters Can Do That Command');
        else {
          message.channel.bulkDelete(args[1]);   
        }    
        break;
      
        

        case 'usercard':
        const card = new Discord.RichEmbed()
        
        .addField('Username' , message.author.username , true)
        .addField('Nickname' , message.member.nickname)
        .addField('JoinDate' , message.member.joinedAt, true)
        .addField('Status' , message.member.presence.status, true)
        .addField('Roles' , `${message.member.roles.size}`, true)
        .addField('ID' , message.author.id , true)
        .addField('Highest Role', message.member.highestRole)
        .addField('Last Message', message.member.lastMessage)
        .setColor(0x581845)
        .setThumbnail(message.author.avatarURL)
        .setTimestamp()
        .addBlankField(true)
        .setFooter('LH Bot created by Swo0p#0034', bot.user.displayAvatarURL)

        message.channel.sendEmbed(card);
        break;



        case 'server':   
        const serverlevel = ["None", "Low", "Mediom", "High", "Max"];
        const server = new Discord.RichEmbed()

        .addField('Owner' , message.guild.owner)
        .addField('Member Count' , message.guild.memberCount)
        .addField('Creation Date' , message.guild.createdAt)
        .addField('Region' , "EU") 
        .addField('Roles' , message.guild.roles.size)
        .addField('Bots' , message.guild.members.filter(member => member.user.bot === true).size)
        .addField('Channels' , message.guild.channels.size)
        .addField('Server ID' , "538869462808395787")
        .addField('Verification level' , serverlevel[message.guild.verificationLevel])
        .setColor(0x581845)
        .setThumbnail(message.guild.iconURL)
        .setTimestamp()
        .addBlankField(true)
        .setFooter('LH Bot created by Swo0p#0034', bot.user.displayAvatarURL)
        
        message.channel.sendEmbed(server)
        break;

        
  





        //Moderation Commands
             case 'kick':
         let Kuser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

         if(!args[1]) return message.reply('Please Specify a user to kick');
         if(!Kuser) return message.channel.send("Can't find the user");
         if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("No can do pal!");
         if(Kuser.hasPermission("MANAGE_CHANNELS")) return message.channel.send("The user is a manager or above and can only be kicked manually");
          Kuser.kick();
          message.reply('User Has Been Kicked!');   
          break;     



        case 'ban':
        let Buser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

        if(!Buser) return message.reply('Please Specify a user to ban');
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("No can do pal!");
        if(Buser.hasPermission("MANAGE_CHANNELS")) return message.channel.send("The user is a manager or above and can only be banned manually");
      else {
         Buser.ban()
         message.reply('The User has Been Banned!')
         break;
     }

        //command to change a certain user's username
        case 'setnickname':
        let Nuser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        let NickReason = args.slice(2).join(" ");

        if(!Nuser) return message.reply('Please mention a user')
        if(!NickReason) return message.reply('Mention the new nickname')
        if(!Nuser) return message.channel.send("Can't find the user")
        if(!message.member.hasPermission("MANAGE_NICKNAMES")) return message.channel.send("No can do pal!");       
        Nuser.setNickname(NickReason);
        message.channel.send('The user nickname has been changed');     
        break;

        
        //Command to report a certain user
        case 'report':
        let Ruser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        let ReportMessage = args[3];
        let ReportedToUser = message.guild.owner;
        let Reporter = message.member; 

        if(!Ruser) return message.reply('Please Specify a user to report');
        if(!ReportMessage) return message.reply('Please Specify your problem in 1 word(BM, NoRespect...), after that a staff member will contact you :)')
        else {
          ReportedToUser.send(Reporter + "  " + "reported" + "  " + Ruser + "  " + "because of" + "  " + ReportMessage)
          message.reply('The user has been reported successfully !') }
        break;



        case 'announce':
        if(!message.member.hasPermission("ADMINISTRATOR"))  return message.channel.send("You can't do that command");
        let argsresult;
        let mChannel = message.mentions.channels.first();
        if(!mChannel) return message.channel.send("Please mention the announcement channel");

        message.delete()
        if(mChannel){
          argsresult = args.slice(2).join(" ")
          mChannel.send(argsresult)
        } else {
          argsresult = args.join(" ")
          message.channel.send(argsresult)
       }
       break;


       



     //The Help Command
     case 'help':
     const CommandsEmbed = new Discord.RichEmbed()   

     .addField("`Moderation commands`")
     .addField('**-kick**' , "(Mods And Admins Only)  a basic kick command", true)
     .addField('**-ban**' , "(Mods And Admins Only)  a basic ban command", true)
     .addField('**-purge**' , "(Mods And Admins Only)  a command that clears a specified amount of messages", true)  
     .addField('**-setnickname**' , "(Mods And Admins Only)  a command that changes a user's nickname", true) 
     .addField('**-mute**' , "(Mods And Admins Only)  a command that prevents a user from typing on text channels", true)
     .addField('**-unmute**' , "(Mods And Admins Only)  a command used to let a muted user type on text channels again", true)
     .addField('**-warn**' , "(Mods And Admins Only)  a command that gives a warn to a specefied member", true) 
     .addField('**-report**' , "A command to report a user", true)  
     .addField('**-announce**' , "(Head admins only) a command that announces something in a mentioned channel", true)
     .addField('**-vote**' , "A command to suggest something new for the server", true)
     
     .setColor(0x581845)
     .setThumbnail(message.guild.iconURL)

     .addField('`Information commands`')   
     .addField('**-server**' , "It shows information about the server", true)
     .addField('**-card**' , "It shows informations about you in the server", true)
     .addField('**-roles**' , "A command that shoows all the assignable roles", true)
     .addField('**-social**' , "Gives you the links of LH's social media", true)
     .addField('**-avatar**', "Shows a full picture of the user's avatar/icon")

     .addField("`Fun commands`")
     .addField('**-slap**' , "A command to slap somebody", true)
     .addField('**-random**' , "You ask a question and the bot responds randomly by Yes or No", true)   
     .addField('**-meme**' , "A random meme generator command", true)

     
     .setTimestamp()
     .addBlankField(true)
     .setFooter('LH Bot created by Swo0p#0034', bot.user.displayAvatarURL)

     message.author.sendEmbed(CommandsEmbed)
     message.reply('Check your DMs');
     break;

     
   //command to prevent certain user from typing in the server
   case 'mute':
   const Muser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));



   if(!Muser) return message.reply("Please Specify a user to mute");
   if(Muser.hasPermission("ADMINISTRATOR")) return message.reply("You Can Not Mute My Daddy!")
   if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply("You Can Not Do This Command Buddy");
   if(Muser.hasPermission("MANAGE_ROLES")) return message.reply("The Person You Are Trying To Mute Has Same Or Bigger Role Than You!");
   
    else {
      Muser.addRole("550002681276661792")
      message.reply('The User Has Been Muted!')
      break;
   }


   //command to unmute a muted user.
   case 'unmute':
   let UMuser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

   if(!UMuser) return message.reply('Please Specify a user to unmute');
   if(UMuser.hasPermission("ADMINISTRATOR")) return message.reply('You Can Not Mute My Daddy!')
   if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply('You Can Not Do This Command Buddy');
   if(UMuser.hasPermission("MANAGE_ROLES")) return message.reply('The Person You Are Trying To Mute Has Same Or Bigger Role Than You!');
   
    else {
      UMuser.removeRole("550002681276661792")
      message.reply('The User Has Been Unmuted!')
      break;
   }


    case 'roles':
    let RolesEmbed = new Discord.RichEmbed()

    .setTitle('`Available roles`')
    .addField('EU',"Region Role" ,true)
    .addField('NA',"Region Role", true)
    .addField('SEA',"Region Role", true)
    .addField('AUS',"Region Role", true)
    .addField('BRZ',"Region Role", true)
    .addField('Tin',"Rank Role", true)
    .addField('Bronze',"Rank Role", true)
    .addField('Silver',"Rank Role", true)
    .addField('Gold',"Rank Role", true)
    .addField('Platinum',"Rank Role", true)
    .addField('Diamond',"Rank Role", true)
    .addField('+2200',"Rank Role", true)
    .addField('+2400',"Rank Role", true)
    .addField('+2600',"Rank Role", true)
    .addField('Challenges',"Activity Role", true)
    .addField('Koths', "Activity Role", true)
    .addField("Friday's war", "Activity Role", true)
    .addField("Sparring", "Activity Role", true)
    .setColor(0x581845)
    .setTimestamp()
    .addBlankField(true)
    .setFooter('LH Bot created by Swo0p#0034', bot.user.displayAvatarURL)

    message.channel.send(RolesEmbed);
    break;

  


   case 'warn':
   const Wuser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  
   if(!args[1]) return message.reply('Please Specify a user to warn');
   if(Wuser.hasPermission("ADMINISTRATOR")) return message.reply("The user you're trying to mute is an admin or above");
   if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply('You Can Not Do This Command Buddy');
   if(Wuser.hasPermission("MANAGE_ROLES")) return message.reply('The Person You Are Trying To Warn is a moderator or an admin');
   Wuser.addRole('560950407875133455');
   message.reply("The user has been warned !");
   break;

   
   






//Other commands
 case 'social':
 let SocialEmbed = new Discord.RichEmbed()

 .setTitle('`Social Links:`')
 .addField("Twitch", 'https://www.twitch.tv/leaguehalla')
 .addField("Twitter", 'https://www.twitter.com/leaguehalla')
 .addField("Youtube", '')
 .setColor(0x581845)
 .setTimestamp()
 .addBlankField(true)
 .setFooter('LH Bot created by Swo0p#0034', bot.user.displayAvatarURL)

 message.channel.send(SocialEmbed);

 break;




case 'hello':
message.reply('Hello need help with something ?')
break;



case 'random':
if(!args[1]) return message.reply('You need a second argument')
if(args[1] === "is" || args[1] === "do" || args[1] === 'should' || args[1] === 'are' || args[1] === 'can'){
  message.channel.send('Yes')
}
else {
  message.channel.send('No') 
}
break;



case 'slap':
if(!args[1]) return message.reply('Please specify a user to slap')
let SlappedUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
const SlapEmbed = new Discord.RichEmbed()

.setAuthor(`${SlappedUser.displayName} Has been slapped !`)
.setImage('https://media1.tenor.com/images/fb17a25b86d80e55ceb5153f08e79385/tenor.gif?itemid=7919028')
.setColor(0x581845)
.setTimestamp()
.addBlankField(true)
.setFooter('LH Bot created by Swo0p#0034', bot.user.displayAvatarURL)

message.channel.sendEmbed(SlapEmbed)
break;



case 'avatar':
const AvatarEmbed = new Discord.RichEmbed()

.setImage(message.author.avatarURL)
.addBlankField(true)
.setTimestamp()
.setFooter('Bot created by Swo0p', bot.user.displayAvatarURL)
.setColor(0x581845)

message.reply('Here is your avatar', AvatarEmbed);
break;


}
})
  

bot.login(BOT_TOKEN);
