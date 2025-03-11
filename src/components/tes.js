// curl --request POST \
//      --url 'https://api.onesignal.com/notifications' \
//      --header 'Authorization: Basic ' \
//      --header 'accept: application/json' \
//      --header 'content-type: application/json' \
//      --data '
// {
//   "app_id": "bc4f7229-b263-4f40-967c-e8350bcd6e99",
//   "target_channel": "push",
//   "contents": {"en": "English Message", "es": "Spanish Message"},
//   "included_segments": ["93f0abdb-7139-43c2-92cc-6b82169cb8c6"]
// }
// '

// curl --request POST \
//      --url 'https://api.onesignal.com/notifications' \
//      --header 'Authorization: Basic os_v2_app_xrhxeknsmnhubft45a2qxtloteorcoicuvfuxt5mzlrvoegzugcnpri6nkv7xgodta4phiqyu43imxajrwokqhhredk7h4q2obitkly' \
//      --header 'accept: application/json' \
//      --header 'content-type: application/json' \
//      --data '
// {
//   "app_id": "bc4f7229-b263-4f40-967c-e8350bcd6e99",
//   "target_channel": "push",
//   "headings": {"en": "English Title", "es": "Spanish Title"},
//   "contents": {"en": "English Message", "es": "Spanish Message"},
//   "include_subscription_ids": [
//       "93f0abdb-7139-43c2-92cc-6b82169cb8c6"
//     ]
// }
// '
