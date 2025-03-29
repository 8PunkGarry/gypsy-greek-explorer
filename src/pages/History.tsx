
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TestCard from "@/components/ui/TestCard";
import { Question } from '@/types/questions';
import { UserAuthDialog } from '@/components/ui/UserAuthDialog';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Home, Book, Map, Compass, LandPlot } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const historyQuestions: Question[] = [
  {
    id: "1",
    category: "history",
    text: "Η Βυζαντινή Αυτοκρατορία ήταν:",
    options: [
      { id: "a", text: "εχθρός της Ρωμαϊκής Αυτοκρατορίας", isCorrect: false },
      { id: "b", text: "η Δυτική Ρωμαϊκή Αυτοκρατορία", isCorrect: false },
      { id: "c", text: "το Ανατολικό τμήμα της Ρωμαϊκής Αυτοκρατορίας", isCorrect: true },
      { id: "d", text: "σύμμαχος της Ρωμαϊκής Αυτοκρατορίας", isCorrect: false },
    ],
    explanation: "Η Βυζαντινή Αυτοκρατορία ήταν το Ανατολικό τμήμα της Ρωμαϊκής Αυτοκρατορίας.",
  },
  {
    id: "2",
    category: "history",
    text: "Ποιος είναι ο εικονιζόμενος;",
    options: [
      { id: "a", text: "Αθανάσιος Διάκος", isCorrect: false },
      { id: "b", text: "Γεώργιος Καραϊσκάκης", isCorrect: false },
      { id: "c", text: "Θεόδωρος Κολοκοτρώνης", isCorrect: false },
      { id: "d", text: "Οδυσσέας Ανδρούτσος", isCorrect: true },
    ],
    explanation: "Στην εικόνα απεικονίζεται ο Οδυσσέας Ανδρούτσος, σημαντικός αγωνιστής της Ελληνικής Επανάστασης του 1821.",
  },
  {
    id: "3",
    category: "history",
    text: "Η παρακάτω φωτογραφία απεικονίζει:",
    options: [
      { id: "a", text: "Την καταστροφή της Χίου", isCorrect: false },
      { id: "b", text: "Το Ολοκαύτωμα του Μεσολογγίου", isCorrect: false },
      { id: "c", text: "Την απελευθέρωση της Θεσσαλονίκης", isCorrect: false },
      { id: "d", text: "Την καταστροφή της Σμύρνης", isCorrect: true },
    ],
    explanation: "Η φωτογραφία απεικονίζει την καταστροφή της Σμύρνης το 1922.",
  },
  {
    id: "4",
    category: "history",
    text: "Η παρακάτω φωτογραφία προέρχεται από:",
    options: [
      { id: "a", text: "Τους εορτασμούς για την είσοδο της Ελλάδας στην Ενωμένη Ευρώπη", isCorrect: false },
      { id: "b", text: "Την Απελευθέρωση της Αθήνας τον Οκτώβριο του 1944", isCorrect: false },
      { id: "c", text: "Την εξέγερση των φοιτητών στο Πολυτεχνείο τον Νοέμβριο του 1973", isCorrect: true },
      { id: "d", text: "Τους πανηγυρισμούς για την αποβίβαση του ελληνικού στρατού στη Σμύρνη, τον Μάιο του 1919", isCorrect: false },
    ],
    explanation: "Η φωτογραφία προέρχεται από την εξέγερση των φοιτητών στο Πολυτεχνείο τον Νοέμβριο του 1973.",
  },
  {
    id: "5",
    category: "history",
    text: "Ο Γεώργιος Παπανδρέου έμεινε γνωστός ως:",
    options: [
      { id: "a", text: "ο γέρος του Μοριά", isCorrect: false },
      { id: "b", text: "ο γέρος της Δημοκρατίας", isCorrect: true },
      { id: "c", text: "Γεωργάκης Ολύμπιος", isCorrect: false },
      { id: "d", text: "Γεώργιος Α΄", isCorrect: false },
    ],
    explanation: "Ο Γεώργιος Παπανδρέου έμεινε γνωστός ως 'ο γέρος της Δημοκρατίας'.",
  },
  {
    id: "6",
    category: "history",
    text: "Ο Γεώργιος Αβέρωφ (1815-1899) υπήρξε ένας από τους:",
    options: [
      { id: "a", text: "γνωστότερους Έλληνες ναυάρχους", isCorrect: false },
      { id: "b", text: "μεγαλύτερους εθνικούς ευεργέτες", isCorrect: true },
      { id: "c", text: "διασημότερους ζαχαροπλάστες στο Παρίσι του 19ου αιώνα", isCorrect: false },
      { id: "d", text: "σημαντικότερους ποιητές της εποχής του", isCorrect: false },
    ],
    explanation: "Ο Γεώργιος Αβέρωφ υπήρξε ένας από τους μεγαλύτερους εθνικούς ευεργέτες της Ελλάδας.",
  },
  {
    id: "7",
    category: "history",
    text: "Ο κεφαλικός φόρος που πλήρωναν οι Χριστιανοί επί Τουρκοκρατίας ονομαζόταν:",
    options: [
      { id: "a", text: "χαράτσι", isCorrect: true },
      { id: "b", text: "δεκάτη", isCorrect: false },
      { id: "c", text: "καπνικός", isCorrect: false },
      { id: "d", text: "παιδομάζωμα", isCorrect: false },
    ],
    explanation: "Ο κεφαλικός φόρος που πλήρωναν οι Χριστιανοί επί Τουρκοκρατίας ονομαζόταν χαράτσι.",
  },
  {
    id: "8",
    category: "history",
    text: "Η διάνοιξη της διώρυγας στον Ισθμό της Κορίνθου είναι έργο του:",
    options: [
      { id: "a", text: "Περίανδρου του Κορίνθιου", isCorrect: false },
      { id: "b", text: "Δημητρίου Πολιορκητή", isCorrect: false },
      { id: "c", text: "Χαρίλαου Τρικούπη", isCorrect: true },
      { id: "d", text: "Ιωάννη Καποδίστρια", isCorrect: false },
    ],
    explanation: "Η διάνοιξη της διώρυγας στον Ισθμό της Κορίνθου είναι έργο του Χαρίλαου Τρικούπη.",
  },
  {
    id: "9",
    category: "history",
    text: "Ο Γεώργιος Αβέρωφ (1815-1899) υπήρξε ένας από τους:",
    options: [
      { id: "a", text: "γνωστότερους Έλληνες ναυάρχους", isCorrect: false },
      { id: "b", text: "μεγαλύτερους εθνικούς ευεργέτες", isCorrect: true },
      { id: "c", text: "διασημότερους ζαχαροπλάστες στο Παρίσι του 19ου αιώνα", isCorrect: false },
      { id: "d", text: "σημαντικότερους ποιητές της εποχής του", isCorrect: false },
    ],
    explanation: "Ο Γεώργιος Αβέρωφ υπήρξε ένας από τους μεγαλύτερους εθνικούς ευεργέτες της Ελλάδας.",
  },
  {
    id: "10",
    category: "history",
    text: "Ο πρώτος Βασιλιάς της Ελλάδας, ο Όθωνας",
    options: [
      { id: "a", text: "ήταν Βαυαρός πρίγκιπας", isCorrect: true },
      { id: "b", text: "ήταν Άγγλος πρίγκιπας", isCorrect: false },
      { id: "c", text: "ήταν Γάλλος πρίγκιπας", isCorrect: false },
      { id: "d", text: "ήταν Ρώσος πρίγκιπας", isCorrect: false },
    ],
    explanation: "Ο πρώτος Βασιλιάς της Ελλάδας, ο Όθωνας, ήταν Βαυαρός πρίγκιπας.",
  },
  {
    id: "11",
    category: "history",
    text: "Ο Ιωάννης Καποδίστριας ήταν:",
    options: [
      { id: "a", text: "σπουδαίος ποδοσφαιριστής", isCorrect: false },
      { id: "b", text: "στρατιωτικός την εποχή των Βαλκανικών Πολέμων", isCorrect: false },
      { id: "c", text: "ο πρώτος Κυβερνήτης της Ελλάδας", isCorrect: true },
      { id: "d", text: "ο πρώτος Έλληνας Ολυμπιονίκης", isCorrect: false },
    ],
    explanation: "Ο Ιωάννης Καποδίστριας ήταν ο πρώτος Κυβερνήτης της Ελλάδας μετά την απελευθέρωση από τους Οθωμανούς.",
  },
  {
    id: "12",
    category: "history",
    text: "Ποιος είναι ο εικονιζόμενος;",
    options: [
      { id: "a", text: "Μέγας Κωνσταντίνος", isCorrect: false },
      { id: "b", text: "Μέγας Αλέξανδρος", isCorrect: true },
      { id: "c", text: "Μέγας Ναπολέων", isCorrect: false },
      { id: "d", text: "Περικλής", isCorrect: false },
    ],
    explanation: "Στην εικόνα απεικονίζεται ο Μέγας Αλέξανδρος.",
  },
  {
    id: "13",
    category: "history",
    text: "Ο πρώτος Βασιλιάς της Ελλάδας, ο Όθωνας",
    options: [
      { id: "a", text: "ήταν Βαυαρός πρίγκιπας", isCorrect: true },
      { id: "b", text: "ήταν Άγγλος πρίγκιπας", isCorrect: false },
      { id: "c", text: "ήταν Γάλλος πρίγκιπας", isCorrect: false },
      { id: "d", text: "ήταν Ρώσος πρίγκιπας", isCorrect: false },
    ],
    explanation: "Ο πρώτος Βασιλιάς της Ελλάδας, ο Όθωνας, ήταν Βαυαρός πρίγκιπας.",
  },
  {
    id: "14",
    category: "history",
    text: "Ποιος είναι ο εικονιζόμενος;",
    options: [
      { id: "a", text: "Γεώργιος Παπανδρέου", isCorrect: false },
      { id: "b", text: "Κωνσταντίνος Μητσοτάκης", isCorrect: false },
      { id: "c", text: "Κωνσταντίνος Καραμανλής", isCorrect: true },
      { id: "d", text: "Ανδρέας Παπανδρέου", isCorrect: false },
    ],
    explanation: "Στην εικόνα απεικονίζεται ο Κωνσταντίνος Καραμανλής.",
  },
  {
    id: "15",
    category: "history",
    text: "Ποιος είναι ο εικονιζόμενος;",
    options: [
      { id: "a", text: "Παλαιών Πατρών Γερμανός", isCorrect: false },
      { id: "b", text: "Αρχιεπίσκοπος Κύπρου Μακάριος", isCorrect: true },
      { id: "c", text: "Παπαφλέσσας", isCorrect: false },
      { id: "d", text: "Αρχιεπίσκοπος Δαμασκηνός", isCorrect: false },
    ],
    explanation: "Στην εικόνα απεικονίζεται ο Αρχιεπίσκοπος Κύπρου Μακάριος.",
  },
  {
    id: "16",
    category: "history",
    text: "Η παρακάτω φωτογραφία απεικονίζει:",
    options: [
      { id: "a", text: "Δημόσιο εξευτελισμό των Ελλήνων Εβραίων από τους Γερμανούς στη διάρκεια του Δευτέρου Παγκοσμίου Πολέμου", isCorrect: true },
      { id: "b", text: "Στρατιωτικά γυμνάσια την εποχή της Ελληνικής Επανάστασης", isCorrect: false },
      { id: "c", text: "Αιχμαλωσίες την περίοδο των Βαλκανικών Πολέμων", isCorrect: false },
      { id: "d", text: "Στρατιωτικές επιδείξεις", isCorrect: false },
    ],
    explanation: "Η φωτογραφία απεικονίζει το δημόσιο εξευτελισμό των Ελλήνων Εβραίων από τους Γερμανούς στη διάρκεια του Δευτέρου Παγκοσμίου Πολέμου.",
  },
  {
    id: "17",
    category: "history",
    text: "Η περίοδος της σύγχρονης ελληνικής ιστορίας, μετά την πτώση της δικτατορίας τον Ιούλιο του 1974, ονομάζεται:",
    options: [
      { id: "a", text: "Μεταπολίτευση", isCorrect: true },
      { id: "b", text: "Ελληνική Επανάσταση", isCorrect: false },
      { id: "c", text: "Περσικοί Πόλεμοι", isCorrect: false },
      { id: "d", text: "Βυζαντινή περίοδος", isCorrect: false },
    ],
    explanation: "Η περίοδος της σύγχρονης ελληνικής ιστορίας, μετά την πτώση της δικτατορίας τον Ιούλιο του 1974, ονομάζεται Μεταπολίτευση.",
  },
  {
    id: "18",
    category: "history",
    text: "Η παρακάτω φωτογραφία απεικονίζει:",
    options: [
      { id: "a", text: "Την καταστροφή της Χίου", isCorrect: false },
      { id: "b", text: "Το Ολοκαύτωμα του Μεσολογγίου", isCorrect: false },
      { id: "c", text: "Την απελευθέρωση της Θεσσαλονίκης", isCorrect: false },
      { id: "d", text: "Την καταστροφή της Σμύρνης", isCorrect: true },
    ],
    explanation: "Η φωτογραφία απεικονίζει την καταστροφή της Σμύρνης το 1922.",
  },
  {
    id: "19",
    category: "history",
    text: "Η περίοδος 1904-1908, όταν Έλληνες και Βούλγαροι αντάρτες συγκρούσθηκαν μεταξύ τους στα εδάφη της Μακεδονίας που τότε τα κατείχαν οι Οθωμανοί, ονομάστηκε:",
    options: [
      { id: "a", text: "Μακεδονικός Αγώνας", isCorrect: true },
      { id: "b", text: "Μικρασιατική Καταστροφή", isCorrect: false },
      { id: "c", text: "Βαλκανικός Αγώνας", isCorrect: false },
      { id: "d", text: "Αντίσταση της Μακεδονίας", isCorrect: false },
    ],
    explanation: "Η περίοδος 1904-1908, όταν Έλληνες και Βούλγαροι αντάρτες συγκρούσθηκαν μεταξύ τους στα εδάφη της Μακεδονίας που τότε τα κατείχαν οι Οθωμανοί, ονομάστηκε Μακεδονικός Αγώνας.",
  },
  {
    id: "20",
    category: "history",
    text: "Η Άλωση της Κωνσταντινούπολης από τους Οθωμανούς έγινε:",
    options: [
      { id: "a", text: "το 1204", isCorrect: false },
      { id: "b", text: "το 1453", isCorrect: true },
      { id: "c", text: "το 1430", isCorrect: false },
      { id: "d", text: "το 1543", isCorrect: false },
    ],
    explanation: "Η Άλωση της Κωνσταντινούπολης από τους Οθωμανούς έγινε το 1453.",
  },
  {
    id: "21",
    category: "history",
    text: "Ποιος είναι ο εικονιζόμενος;",
    options: [
      { id: "a", text: "Αθανάσιος Διάκος", isCorrect: true },
      { id: "b", text: "Γεώργιος Καραϊσκάκης", isCorrect: false },
      { id: "c", text: "Θεόδωρος Κολοκοτρώνης", isCorrect: false },
      { id: "d", text: "Οδυσσέας Ανδρούτσος", isCorrect: false },
    ],
    explanation: "Στην εικόνα απεικονίζεται ο Αθανάσιος Διάκος.",
  },
  {
    id: "22",
    category: "history",
    text: "Ποιος είναι ο εικονιζόμενος;",
    options: [
      { id: "a", text: "Αθανάσιος Διάκος", isCorrect: false },
      { id: "b", text: "Γεώργιος Καραϊσκάκης", isCorrect: true },
      { id: "c", text: "Θεόδωρος Κολοκοτρώνης", isCorrect: false },
      { id: "d", text: "Οδυσσέας Ανδρούτσος", isCorrect: false },
    ],
    explanation: "Στην εικόνα απεικονίζεται ο Γεώργιος Καραϊσκάκης.",
  },
  {
    id: "23",
    category: "history",
    text: "Η τουρκική εισβολή στην Κύπρο έγινε:",
    options: [
      { id: "a", text: "Την 25η Μαρτίου 1821", isCorrect: false },
      { id: "b", text: "Στις 20 Ιουλίου 1974", isCorrect: true },
      { id: "c", text: "Την 5η Οκτωβρίου 1985", isCorrect: false },
      { id: "d", text: "Την 30η Απριλίου 1890", isCorrect: false },
    ],
    explanation: "Η τουρκική εισβολή στην Κύπρο έγινε στις 20 Ιουλίου 1974.",
  },
  {
    id: "24",
    category: "history",
    text: "Η παρακάτω φωτογραφία προέρχεται από:",
    options: [
      { id: "a", text: "Τους εορτασμούς για την είσοδο της Ελλάδας στην Ενωμένη Ευρώπη", isCorrect: false },
      { id: "b", text: "Την Απελευθέρωση της Αθήνας τον Οκτώβριο του 1944", isCorrect: false },
      { id: "c", text: "Την εξέγερση των φοιτητών στο Πολυτεχνείο τον Νοέμβριο του 1973", isCorrect: true },
      { id: "d", text: "Τους πανηγυρισμούς για την αποβίβαση του ελληνικού στρατού στη Σμύρνη, τον Μάιο του 1919", isCorrect: false },
    ],
    explanation: "Η φωτογραφία προέρχεται από την εξέγερση των φοιτητών στο Πολυτεχνείο τον Νοέμβριο του 1973.",
  },
  {
    id: "25",
    category: "history",
    text: "Η παρακάτω φωτογραφία απεικονίζει:",
    options: [
      { id: "a", text: "Δημόσιο εξευτελισμό των Ελλήνων Εβραίων από τους Γερμανούς στη διάρκεια του Δευτέρου Παγκοσμίου Πολέμου", isCorrect: true },
      { id: "b", text: "Στρατιωτικά γυμνάσια την εποχή της Ελληνικής Επανάστασης", isCorrect: false },
      { id: "c", text: "Αιχμαλωσίες την περίοδο των Βαλκανικών Πολέμων", isCorrect: false },
      { id: "d", text: "Στρατιωτικές επιδείξεις", isCorrect: false },
    ],
    explanation: "Η φωτογραφία απεικονίζει το δημόσιο εξευτελισμό των Ελλήνων Εβραίων από τους Γερμανούς στη διάρκεια του Δευτέρου Παγκοσμίου Πολέμου.",
  },
  {
    id: "26",
    category: "history",
    text: "Η παρακάτω φωτογραφία απεικονίζει:",
    options: [
      { id: "a", text: "Την καταστροφή της Χίου", isCorrect: false },
      { id: "b", text: "Το Ολοκαύτωμα του Μεσολογγίου", isCorrect: false },
      { id: "c", text: "Την απελευθέρωση της Θεσσαλονίκης", isCorrect: false },
      { id: "d", text: "Την καταστροφή της Σμύρνης", isCorrect: true },
    ],
    explanation: "Η φωτογραφία απεικονίζει την καταστροφή της Σμύρνης το 1922.",
  },
  {
    id: "27",
    category: "history",
    text: "Η περίοδος της σύγχρονης ελληνικής ιστορίας, μετά την πτώση της δικτατορίας τον Ιούλιο του 1974, ονομάζεται:",
    options: [
      { id: "a", text: "Μεταπολίτευση", isCorrect: true },
      { id: "b", text: "Ελληνική Επανάσταση", isCorrect: false },
      { id: "c", text: "Περσικοί Πόλεμοι", isCorrect: false },
      { id: "d", text: "Βυζαντινή περίοδος", isCorrect: false },
    ],
    explanation: "Η περίοδος της σύγχρονης ελληνικής ιστορίας, μετά την πτώση της δικτατορίας τον Ιούλιο του 1974, ονομάζεται Μεταπολίτευση.",
  },
  {
    id: "28",
    category: "history",
    text: "Η τουρκική εισβολή στην Κύπρο έγινε:",
    options: [
      { id: "a", text: "Την 25η Μαρτίου 1821", isCorrect: false },
      { id: "b", text: "Στις 20 Ιουλίου 1974", isCorrect: true },
      { id: "c", text: "Την 5η Οκτωβρίου 1985", isCorrect: false },
      { id: "d", text: "Την 30η Απριλίου 1890", isCorrect: false },
    ],
    explanation: "Η τουρκική εισβολή στην Κύπρο έγινε στις 20 Ιουλίου 1974.",
  },
  {
    id: "29",
    category: "history",
    text: "Η ανατίναξη της Γέφυρας του Γοργοποτάμου στις 25 Νοεμβρίου 1942 ήταν:",
    options: [
      { id: "a", text: "Μια πράξη απελπισίας των Ελλήνων στη διάρκεια των Βαλκανικών Πολέμων.", isCorrect: false },
      { id: "b", text: "Ένα γεγονός για να υπονομευθεί η Χούντα των Συνταγματαρχών.", isCorrect: false },
      { id: "c", text: "Αντίποινα των Τούρκων για να τιμωρήσουν τους Έλληνες για την επανάστασή τους.", isCorrect: false },
      { id: "d", text: "Η κορυφαία κοινή αντιστασιακή δράση των Ελλήνων στη διάρκεια της Катохής κατά τον Δεύτερο Παγκόσμιο Πόλεμο.", isCorrect: true },
    ],
    explanation: "Η ανατίναξη της Γέφυρας του Γοργοποτάμου στις 25 Νοεμβρίου 1942 ήταν η κορυφαία κοινή αντιστασιακή δράση των Ελλήνων στη διάρκεια της Катохής κατά τον Δεύτερο Παγκόσμιο Πόλεμο.",
  },
  {
    id: "30",
    category: "history",
    text: "Η παρακάτω φωτογραφία απεικονίζει:",
    options: [
      { id: "a", text: "Την καταστροφή της Χίου", isCorrect: false },
      { id: "b", text: "Το Ολοκαύτωμα του Μεσολογγίου", isCorrect: false },
      { id: "c", text: "Την απελευθέρωση της Θεσσαλονίκης", isCorrect: false },
      { id: "d", text: "Την καταστροφή της Σμύρνης", isCorrect: true },
    ],
    explanation: "Η φωτογραφία απεικονίζει την καταστροφή της Σμύρνης το 1922.",
  },
  {
    id: "31",
    category: "history",
    text: "Η παρακάτω φωτογραφία προέρχεται από:",
    options: [
      { id: "a", text: "Τους εορτασμούς για την είσοδο της Ελλάδας στην Ενωμένη Ευρώπη", isCorrect: false },
      { id: "b", text: "Την Απελευθέρωση της Αθήνας τον Οκτώβριο του 1944", isCorrect: false },
      { id: "c", text: "Την εξέγερση των φοιτητών στο Πολυτεχνείο τον Νοέμβριο του 1973", isCorrect: true },
      { id: "d", text: "Τους πανηγυρισμούς για την αποβίβαση του ελληνικού στρατού στη Σμύρνη, τον Μάιο του 1919", isCorrect: false },
    ],
    explanation: "Η φωτογραφία προέρχεται από την εξέγερση των φοιτητών στο Πολυτεχνείο τον Νοέμβριο του 1973.",
  },
  {
    id: "32",
    category: "history",
    text: "Η παρακάτω φωτογραφία απεικονίζει:",
    options: [
      { id: "a", text: "Την καταστροφή της Χίου", isCorrect: false },
      { id: "b", text: "Το Ολοκαύτωμα του Μεσολογγίου", isCorrect: false },
      { id: "c", text: "Την απελευθέρωση της Θεσσαλονίκης", isCorrect: false },
      { id: "d", text: "Την καταστροφή της Σμύρνης", isCorrect: true },
    ],
    explanation: "Η φωτογραφία απεικονίζει την καταστροφή της Σμύρνης το 1922.",
  },
  {
    id: "33",
    category: "history",
    text: "Η περίοδος της σύγχρονης ελληνικής ιστορίας, μετά την πτώση της δικτατορίας τον Ιούλιο του 1974, ονομάζεται:",
    options: [
      { id: "a", text: "Μεταπολίτευση", isCorrect: true },
      { id: "b", text: "Ελληνική Επανάσταση", isCorrect: false },
      { id: "c", text: "Περσικοί Πόλεμοι", isCorrect: false },
      { id: "d", text: "Βυζαντινή περίοδος", isCorrect: false },
    ],
    explanation: "Η περίοδος της σύγχρονης ελληνικής ιστορίας, μετά την πτώση της δικτατορίας τον Ιούλιο του 1974, ονομάζεται Μεταπολίτευση.",
  },
  {
    id: "34",
    category: "history",
    text: "Η περίοδος του 5ου αιώνα π.Χ., όταν ο ισχυρότερος πολιτικός άνδρας στην αρχαία Αθήνα ήταν ο Περικλής, άνθισε η Δημοκρατία, άκμασαν τα γράμματα και οι τέχνες και έγιναν τα μεγάλα έργα στην Ακρόπολη, ονομάζεται:",
    options: [
      { id: "a", text: "Χρυσός Αιώνας", isCorrect: true },
      { id: "b", text: "Ελληνική Επανάσταση", isCorrect: false },
      { id: "c", text: "Περσικοί Πόλεμοι", isCorrect: false },
      { id: "d", text: "Βυζαντινή περίοδος", isCorrect: false },
    ],
    explanation: "Η περίοδος του 5ου αιώνα π.Χ., όταν ο ισχυρότερος πολιτικός άνδρας στην αρχαία Αθήνα ήταν ο Περικλής, ονομάζεται Χρυσός Αιώνας.",
  },
  {
    id: "35",
    category: "history",
    text: "Η περίοδος της σύγχρονης ελληνικής ιστορίας, μετά την πτώση της δικτατορίας τον Ιούλιο του 1974, ονομάζεται:",
    options: [
      { id: "a", text: "Μεταπολίτευση", isCorrect: true },
      { id: "b", text: "Ελληνική Επανάσταση", isCorrect: false },
      { id: "c", text: "Περσικοί Πόλεμοι", isCorrect: false },
      { id: "d", text: "Βυζαντινή περίοδος", isCorrect: false },
    ],
    explanation: "Η περίοδος της σύγχρονης ελληνικής ιστορίας, μετά την πτώση της δικτατορίας τον Ιούλιο του 1974, ονομάζεται Μεταπολίτευση.",
  },
  {
    id: "36",
    category: "history",
    text: "Η περίοδος της σύγχρονης ελληνικής ιστορίας, μετά την πτώση της δικτατορίας τον Ιούλιο του 1974, ονομάζεται:",
    options: [
      { id: "a", text: "Μεταπολίτευση", isCorrect: true },
      { id: "b", text: "Ελληνική Επανάσταση", isCorrect: false },
      { id: "c", text: "Περσικοί Πόλεμοι", isCorrect: false },
      { id: "d", text: "Βυζαντινή περίοδος", isCorrect: false },
    ],
    explanation: "Η περίοδος της σύγχρονης ελληνικής ιστορίας, μετά την πτώση της δικτατορίας τον Ιούλιο του 1974, ονομάζεται Μεταπολίτευση.",
  },
  {
    id: "37",
    category: "history",
    text: "Η περίοδος της σύγχρονης ελληνικής ιστορίας, μετά την πτώση της δικτατορίας τον Ιούλιο του 1974, ονομάζεται:",
    options: [
      { id: "a", text: "Μεταπολίτευση", isCorrect: true },
      { id: "b", text: "Ελληνική Επανάσταση", isCorrect: false },
      { id: "c", text: "Περσικοί Πόλεμοι", isCorrect: false },
      { id: "d", text: "Βυζαντινή περίοδος", isCorrect: false },
    ],
    explanation: "Η περίοδος της σύγχρονης ελληνικής ιστορίας, μετά την πτώση της δικτατορίας τον Ιούλιο του 1974, ονομάζεται Μεταπολίτευση.",
  },
];

const History = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredCorrectly, setAnsweredCorrectly] = useState<number>(0);
  const [testCompleted, setTestCompleted] = useState<boolean>(false);
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();

  const handleNextQuestion = () => {
    if (currentQuestionIndex < historyQuestions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setTestCompleted(true);
    }
  };

  const handleAnswer = (wasCorrect: boolean) => {
    if (wasCorrect) {
      setAnsweredCorrectly((prev) => prev + 1);
    }
  };

  const restartTest = () => {
    setCurrentQuestionIndex(0);
    setAnsweredCorrectly(0);
    setTestCompleted(false);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <Home className="h-3.5 w-3.5 mr-1" />
                <span>Home</span>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>History</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col items-center mb-10">
          <h1 className="text-3xl font-bold text-center text-greek-darkBlue mb-4">
            {t('greekHistory')}
          </h1>
          <p className="text-center text-gray-600 max-w-2xl mb-8">
            {t('keyEvents')}
          </p>

          {testCompleted ? (
            <Card className="w-full max-w-3xl shadow-soft">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <h2 className="text-2xl font-bold text-greek-blue">
                    {t('testComplete')}
                  </h2>
                  <p className="text-lg">
                    {t('testCompleteMessage')}
                  </p>
                  <p className="text-xl font-medium">
                    {answeredCorrectly} / {historyQuestions.length} {answeredCorrectly === 1 ? 'question' : 'questions'} answered correctly
                  </p>
                  <Button onClick={restartTest} className="mt-4 bg-greek-darkBlue hover:bg-greek-blue text-white">
                    {t('retakeTest')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <TestCard
              question={historyQuestions[currentQuestionIndex]}
              onNext={handleNextQuestion}
              onAnswer={handleAnswer}
              currentQuestionNumber={currentQuestionIndex + 1}
              totalQuestions={historyQuestions.length}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default History;
