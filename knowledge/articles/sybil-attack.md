---
title: "Sybil attack"
type: article
date_added: 2026-02-14
source: "https://en.wikipedia.org/wiki/Sybil_attack"
author: "Contributors to Wikimedia projects"
tags: [security, attacks, reputation-systems, peer-to-peer, identity-verification, network-defense, cryptocurrency]
via: "Twitter bookmark from @rauchg"
---

A Sybil attack is a network security threat where an attacker creates multiple pseudonymous identities to gain disproportionate influence over a reputation system. The attack exploits the ease of generating new identities in distributed systems, with real-world examples including attacks on Tor, BitTorrent, and cryptocurrency networks. Defenses include identity validation, social trust graphs, economic barriers, personhood verification, and application-specific protocols.

## Key Takeaways

- Sybil attacks undermine reputation systems by exploiting the many-to-one mapping of identities to entities in peer-to-peer networks
- Attack feasibility depends on identity generation cost, system acceptance of unverified entities, and whether all entities are treated identically
- Real-world attacks have compromised major networks: Tor deanonymization attempts, Bitcoin address rewriting on exit relays, DHT poisoning
- Prevention strategies trade off between security and anonymity—identity validation sacrifices privacy while social graph approaches may not scale
- Economic barriers (proof-of-work, stake-based systems) and personhood validation represent emerging defenses with varying deployability

## Full Content

From Wikipedia, the free encyclopedia
					

A Sybil attack is a type of attack on a computer network service in which an attacker subverts the service's reputation system by creating a large number of pseudonymous identities and uses them to gain a disproportionately large influence. It is named after the subject of the book Sybil, a case study of a woman diagnosed with dissociative identity disorder.[1] The name was suggested in or before 2002 by Brian Zill at Microsoft Research.[2] The term pseudospoofing had previously been coined by L. Detweiler on the Cypherpunks mailing list and used in the literature on peer-to-peer systems for the same class of attacks prior to 2002, but this term did not gain as much influence as "Sybil attack".[3]



The Sybil attack in computer security is an attack wherein a reputation system is subverted by creating multiple identities.[4] A reputation system's vulnerability to a Sybil attack depends on how cheaply identities can be generated, the degree to which the reputation system accepts inputs from entities that do not have a chain of trust linking them to a trusted entity, and whether the reputation system treats all entities identically. As of 2012, evidence showed that large-scale Sybil attacks could be carried out in a very cheap and efficient way in extant realistic systems such as BitTorrent Mainline DHT.[5][6]
An entity on a peer-to-peer network is a piece of software that has access to local resources. An entity advertises itself on the peer-to-peer network by presenting an identity. More than one identity can correspond to a single entity. In other words, the mapping of identities to entities is many to one. Entities in peer-to-peer networks use multiple identities for purposes of redundancy, resource sharing, reliability and integrity. In peer-to-peer networks, the identity is used as an abstraction so that a remote entity can be aware of identities without necessarily knowing the correspondence of identities to local entities. By default, each distinct identity is usually assumed to correspond to a distinct local entity. In reality, many identities may correspond to the same local entity.
An adversary may present multiple identities to a peer-to-peer network in order to appear and function as multiple distinct nodes. The adversary may thus be able to acquire a disproportionate level of control over the network, such as by affecting voting outcomes.
In the context of (human) online communities, such multiple identities are sometimes known as sockpuppets.
The less common term inverse-Sybil attack has been used to describe an attack in which many entities appear as a single identity.[7]
Sybil style attacks on online communities can often be mistaken as being performed by automated programs (bots).


A notable Sybil attack in conjunction with a traffic confirmation attack was launched against the Tor anonymity network for several months in 2014.[8][9]
There are other examples of Sybil attacks run against Tor network users. This includes the 2020 Bitcoin address rewrite attacks. The attacker controlled a quarter of all Tor exit relays and employed SSL stripping to downgrade secure connections and divert funds to the wallet of the threat actor known as BTCMITM20.[10][11][12]
Another notable example is the 2017–2021 attack run by threat actor KAX17. This entity controlled over 900 malicious servers, primarily middle points, in an attempt to deanonymize Tor users.[13][14]


Known approaches to Sybil attack prevention include identity validation, social trust graph algorithms, economic costs, personhood validation, and application-specific defenses.

Identity validation[edit]
Validation techniques can be used to prevent Sybil attacks and dismiss masquerading hostile entities. A local entity may accept a remote identity based on a central authority which ensures a one-to-one correspondence between an identity and an entity and may even provide a reverse lookup. An identity may be validated either directly or indirectly. In direct validation the local entity queries the central authority to validate the remote identities. In indirect validation the local entity relies on already-accepted identities which in turn vouch for the validity of the remote identity in question.
Practical network applications and services often use a variety of identity proxies to achieve limited Sybil attack resistance, such as telephone number verification, credit card verification, or even based on the IP address of a client. These methods have the limitations that it is usually possible to obtain multiple such identity proxies at some cost – or even to obtain many at low cost through techniques such as SMS spoofing or IP address spoofing. Use of such identity proxies can also exclude those without ready access to the required identity proxy: e.g., those without their own mobile phone or credit card, or users located behind carrier-grade network address translation who share their IP addresses with many others.
Identity-based validation techniques generally provide accountability at the expense of anonymity, which can be an undesirable tradeoff especially in online forums that wish to permit censorship-free information exchange and open discussion of sensitive topics. A validation authority can attempt to preserve users' anonymity by refusing to perform reverse lookups, but this approach makes the validation authority a prime target for attack. Protocols using threshold cryptography can potentially distribute the role of such a validation authority among multiple servers, protecting users' anonymity even if one or a limited number of validation servers is compromised.[15]


Sybil prevention techniques based on the connectivity characteristics of social graphs can also limit the extent of damage that can be caused by a given Sybil attacker while preserving anonymity. Examples of such prevention techniques include SybilGuard,[16] SybilLimit,[17] the Advogato Trust Metric,[18] SybilRank,[19] and the sparsity based metric to identify Sybil clusters in a distributed P2P based reputation system.[20]
These techniques cannot prevent Sybil attacks entirely, and may be vulnerable to widespread small-scale Sybil attacks. In addition, it is not clear whether real-world online social networks will satisfy the trust or connectivity assumptions that these algorithms assume.[21]


Alternatively, imposing economic costs as artificial barriers to entry may be used to make Sybil attacks more expensive. Proof of work, for example, requires a user to prove that they expended a certain amount of computational effort to solve a cryptographic puzzle. In Bitcoin and related permissionless cryptocurrencies, miners compete to append blocks to a blockchain and earn rewards roughly in proportion to the amount of computational effort they invest in a given time period. Investments in other resources such as storage or stake in existing cryptocurrency may similarly be used to impose economic costs.


Atomic Ownership Blockchains thwart Sybil attacks through its decentralized architecture of independent micro-private chains per atomic asset. Each chain is controlled solely by its cryptographic owner via signatures, bypassing node-voting consensus. Attackers cannot amplify influence by spawning fake identities, as security relies on broadcast timing and verifiable transfers, not participant count or resource pooling, ensuring equitable, tamper-proof circulation.[22]

Personhood validation[edit]
As an alternative to identity verification that attempts to maintain a strict "one-per-person" allocation rule, a validation authority can use some mechanism other than knowledge of a user's real identity – such as verification of an unidentified person's physical presence at a particular place and time as in a pseudonym party[23] – to enforce a one-to-one correspondence between online identities and real-world users. Such proof of personhood approaches have been proposed as a basis for permissionless blockchains and cryptocurrencies in which each human participant would wield exactly one vote in consensus.[24][25] A variety of approaches to proof of personhood have been proposed, some with deployed implementations, although many usability and security issues remain.[26]

Application-specific defenses[edit]
A number of distributed protocols have been designed with Sybil attack protection in mind. SumUp[27] and DSybil[28] are Sybil-resistant algorithms for online content recommendation and voting. Whānau is a Sybil-resistant distributed hash table algorithm.[29] I2P's implementation of Kademlia also has provisions to mitigate Sybil attacks.[30]


Astroturfing
Ballot stuffing
Social bot
Sockpuppetry


^ Lynn Neary (20 October 2011). Real 'Sybil' Admits Multiple Personalities Were Fake. NPR. Retrieved 8 February 2017.

^ Douceur, John R (2002). "The Sybil Attack". Peer-to-Peer Systems. Lecture Notes in Computer Science. Vol. 2429. pp. 251–60. doi:10.1007/3-540-45748-8_24. ISBN 978-3-540-44179-3.

^ Oram, Andrew (2001). Peer-to-peer: harnessing the benefits of a disruptive technology. "O'Reilly Media, Inc.". ISBN 978-0-596-00110-0.

^ Trifa, Zied; Khemakhem, Maher (2014). "Sybil Nodes as a Mitigation Strategy Against Sybil Attack". Procedia Computer Science. 32: 1135–40. doi:10.1016/j.procs.2014.05.544.

^ Wang, Liang; Kangasharju, Jussi (2012). "Real-world sybil attacks in BitTorrent mainline DHT". 2012 IEEE Global Communications Conference (GLOBECOM). pp. 826–32. doi:10.1109/GLOCOM.2012.6503215. ISBN 978-1-4673-0921-9. S2CID 9958359.

^ Wang, Liang; Kangasharju, Jussi (2013). "Measuring large-scale distributed systems: case of BitTorrent Mainline DHT". IEEE P2P 2013 Proceedings. pp. 1–10. doi:10.1109/P2P.2013.6688697. ISBN 978-1-4799-0515-7. S2CID 5659252.

^ Auerbach, Benedikt; Chakraborty, Suvradip; Klein, Karen; Pascual-Perez, Guillermo; Pietrzak, Krzysztof; Walter, Michael; Yeo, Michelle (2021). "Inverse-Sybil Attacks in Automated Contact Tracing". Topics in Cryptology – CT-RSA 2021. Cham: Springer International Publishing. pp. 399–421. doi:10.1007/978-3-030-75539-3_17. ISBN 978-3-030-75538-6. ISSN 0302-9743. S2CID 220274872.

^  Tor security advisory: "relay early" traffic confirmation attack Tor Project, 30 July 2014

^ Dan Goodin (31 July 2014). Active attack on Tor network tried to decloak users for five months.

^ Cimpanu, Catalin (3 December 2021). "A mysterious threat actor is running hundreds of malicious Tor relays". The Record. Retrieved 7 December 2021. ... most threat actors operating malicious Tor relays tend to focus on running exit points, which allows them to modify the user's traffic. For example, a threat actor that Nusenu has been tracking as BTCMITM20 ran thousands of malicious Tor exit nodes in order to replace Bitcoin wallet addresses inside web traffic and hijack user payments.

^ Cimpanu, Catalin (9 May 2021). "Thousands of Tor exit nodes attacked cryptocurrency users over the past year". The Record. Retrieved 7 December 2021. For more than 16 months, a threat actor has been seen adding malicious servers to the Tor network in order to intercept traffic and perform SSL stripping attacks on users accessing cryptocurrency-related sites.

^ isabela (14 August 2020). "Tor security advisory: exit relays running sslstrip in May and June 2020". Tor Blog. Retrieved 7 December 2021.

^ Cimpanu, Catalin (3 December 2021). "A mysterious threat actor is running hundreds of malicious Tor relays". The Record. Retrieved 7 December 2021. Grouping these servers under the KAX17 umbrella, Nusenu says this threat actor has constantly added servers ... in industrial quantities, operating servers in the realm of hundreds at any given point.

^ Paganini, Pierluigi (3 December 2021). "KAX17 threat actor is attempting to deanonymize Tor users running thousands of rogue relays". Cyber Security. Retrieved 7 December 2021. Most of the Tor relay servers set up by the KAX17 actor were located in data centers all over the world and are configured as entry and middle points primarily.

^ John Maheswaran; Daniel Jackowitz; Ennan Zhai; David Isaac Wolinsky; Bryan Ford (9 March 2016). Building Privacy-Preserving Cryptographic Credentials from Federated Online Identities (PDF). 6th ACM Conference on Data and Application Security and Privacy (CODASPY).

^ Yu, Haifeng; Kaminsky, Michael; Gibbons, Phillip B; Flaxman, Abraham (2006). SybilGuard: defending against sybil attacks via social networks. 2006 conference on Applications, technologies, architectures, and protocols for computer communications - SIGCOMM '06. pp. 267–78. doi:10.1145/1159913.1159945. ISBN 978-1-59593-308-9.

^ SybilLimit: A Near-Optimal Social Network Defense against Sybil Attacks. IEEE Symposium on Security and Privacy. 19 May 2008. doi:10.1109/SP.2008.13.

^ O'Whielacronx, Zooko. "Levien's attack-resistant trust metric". <p2p-hackers at lists.zooko.com>. gmane.org. Archived from the original on 7 July 2014. Retrieved 10 February 2012.

^ Cao, Qiang; Sirivianos, Michael; Yang, Xiaowei; Pregueiro, Tiago (25–27 April 2012). Aiding the Detection of Fake Accounts in Large Scale Social Online Services. USENIX Networked Systems Design and Implementation.

^ Kurve, Aditya; Kesidis, George (2011). "Sybil Detection via Distributed Sparse Cut Monitoring". 2011 IEEE International Conference on Communications (ICC). pp. 1–6. doi:10.1109/icc.2011.5963402. ISBN 978-1-61284-232-5. S2CID 5082605.

^ Bimal Viswanath; Ansley Post; Krishna Phani Gummadi; Alan E Mislove (August 2010). "An analysis of social network-based Sybil defenses". ACM SIGCOMM Computer Communication Review. 40 (4): 363–374. doi:10.1145/1851275.1851226.

^ Liu, Zhuo (29 October 2025). "Achieving Greater Decentralization with Atomic Ownership Blockchains". Ledger. 10: 136–153. doi:10.5195/ledger.2025.425. Retrieved 10 November 2025.

^ Ford, Bryan; Strauss, Jacob (1 April 2008). An Offline Foundation for Online Accountable Pseudonyms. 1st Workshop on Social Network Systems - SocialNets '08. pp. 31–6. doi:10.1145/1435497.1435503. ISBN 978-1-60558-124-8.

^ Maria Borge; Eleftherios Kokoris-Kogias; Philipp Jovanovic; Linus Gasser; Nicolas Gailly; Bryan Ford (29 April 2017). Proof-of-Personhood: Redemocratizing Permissionless Cryptocurrencies. IEEE Security & Privacy on the Blockchain (IEEE S&B). doi:10.1109/EuroSPW.2017.46.

^ Ford, Bryan (December 2020). "Technologizing Democracy or Democratizing Technology? A Layered-Architecture Perspective on Potentials and Challenges". In Lucy Bernholz; Hélène Landemore; Rob Reich (eds.). Digital Technology and Democratic Theory. University of Chicago Press. ISBN 978-0-226-74857-3.

^ Divya Siddarth; Sergey Ivliev; Santiago Siri; Paula Berman (13 October 2020). "Who Watches the Watchmen? A Review of Subjective Approaches for Sybil-resistance in Proof of Personhood Protocols | class cs.CR". arXiv:2008.05300 [cs.CR].

^ Nguyen Tran; Bonan Min; Jinyang Li; Lakshminarayanan Subramanian (22 April 2009). Sybil-Resilient Online Content Voting (PDF). NSDI '09: 6th USENIX Symposium on Networked Systems Design and Implementation.

^ Haifeng Yu; Chenwei Shi; Michael Kaminsky; Phillip B. Gibbons; Feng Xiao (19 May 2009). DSybil: Optimal Sybil-Resistance for Recommendation Systems. 30th IEEE Symposium on Security and Privacy. doi:10.1109/SP.2009.26.

^ Chris Lesniewski-Laas; M. Frans Kaashoek (28 April 2010). Whānau: A Sybil-proof Distributed Hash Table (PDF). 7th USENIX Symposium on Network Systems Design and Implementation (NSDI).

^ "The Network Database - I2P".



Querci, Daniele; Hailes, Stephen (2010). "Sybil Attacks Against Mobile Users: Friends and Foes to the Rescue". 2010 Proceedings IEEE INFOCOM. pp. 1–5. CiteSeerX 10.1.1.360.8730. doi:10.1109/INFCOM.2010.5462218. ISBN 978-1-4244-5836-3. S2CID 2451937.
Bazzi, Rida A; Konjevod, Goran (2006). "On the establishment of distinct identities in overlay networks". Distributed Computing. 19 (4): 267–87. doi:10.1007/s00446-006-0012-y. S2CID 2723075.
Lesniewski-Laas, Chris (2008). "A Sybil-proof one-hop DHT". Proceedings of the 1st workshop on Social network systems - SocialNets '08. pp. 19–24. doi:10.1145/1435497.1435501. ISBN 978-1-60558-124-8. S2CID 5793502.
Newsome, James; Shi, Elaine; Song, Dawn; Perrig, Adrian (2004). "The sybil attack in sensor networks". Proceedings of the third international symposium on Information processing in sensor networks - IPSN'04. pp. 259–68. doi:10.1145/984622.984660. ISBN 978-1-58113-846-7. S2CID 12451248.
A Survey of Solutions to the Sybil Attack
On Network formation: Sybil attacks and Reputation systems
Seigneur, Jean-Marc; Gray, Alan; Jensen, Christian Damsgaard (2005). "Trust Transfer: Encouraging Self-recommendations Without Sybil Attack". Trust Management. Lecture Notes in Computer Science. Vol. 3477. pp. 321–37. CiteSeerX 10.1.1.391.5003. doi:10.1007/11429760_22. ISBN 978-3-540-26042-4.
A Survey of DHT Security Techniques by Guido Urdaneta, Guillaume Pierre and Maarten van Steen. ACM Computing surveys, 2009.
An experiment on the weakness of reputation algorithms used in professional social networks: the case of Naymz by Marco Lazzari. Proceedings of the IADIS International Conference e-Society 2010.

## Links

- [Article](https://en.wikipedia.org/wiki/Sybil_attack)
- [Original Tweet](https://x.com/rauchg/status/2022316318964568468)
